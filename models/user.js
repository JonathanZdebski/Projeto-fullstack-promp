import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  //propriedades: email, username e image.
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    // username deve seguir uma expressão regular que valida se o valor contém de 8 a 20 caracteres alfanuméricos e não contém caracteres especiais.
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
//Esse modelo pode ser usado para criar, ler, atualizar e excluir objetos "User" em um banco de dados MongoDB.

export default User;
