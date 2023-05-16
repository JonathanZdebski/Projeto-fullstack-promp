import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

//O código acima extrai os dados enviados na requisição e cria um novo objeto do tipo Prompt com esses dados. Em seguida, a função save() é chamada para salvar esse novo objeto no banco de dados MongoDB.
