import type { AIModel } from "ai"

export function deepseek(model: string): AIModel {
  return {
    id: model,
    name: "DeepSeek",
    provider: "deepseek",
    streamable: true,
    requestBuilder: (params) => {
      return {
        url: "https://api.deepseek.com/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            ...(params.system ? [{ role: "system", content: params.system }] : []),
            { role: "user", content: params.prompt },
          ],
          stream: true,
        }),
      }
    },
    responseTransformer: async function* (response) {
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available")

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") continue

            try {
              const json = JSON.parse(data)
              const content = json.choices[0]?.delta?.content || ""
              if (content) {
                yield { type: "text-delta", textDelta: content }
              }
            } catch (e) {
              console.error("Error parsing JSON:", e)
            }
          }
        }
      }
    },
  }
}

