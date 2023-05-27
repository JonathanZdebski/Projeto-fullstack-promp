import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//a função "Prompt.find({ creator: params.id })" é chamada para buscar todos os registros da coleção "Prompt" que possuem o campo "creator" igual ao valor de "params.id". O campo "creator" é preenchido com os dados relacionados.
//Por fim, é retornado um objeto Response com os prompts encontrados convertidos em formato JSON e o status 200.
