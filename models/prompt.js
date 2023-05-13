import { Schema, model, models } from "mongoose"; //módulos

const PromptSchema = new Schema({ // propriedades: creator, prompt e tag.
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
//Esse modelo pode ser usado para criar, ler, atualizar e excluir objetos "Prompt" em um banco de dados MongoDB.

export default Prompt;
