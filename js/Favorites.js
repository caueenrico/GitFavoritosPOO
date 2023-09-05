import { Github } from "./GitHub.js";

//classe que vai conter a logica dos dados
//como os dados serao estruturados
export class FavoritesData {
  constructor(divprincipal) {
    this.root = document.querySelector(divprincipal);
    this.load();
  }

  load() {
    //pegando os dados de entrada no localstorage
    this.entries =
      JSON.parse(localStorage.getItem("@github-adicionados:")) || [];
  }

  async addUser(username) {
    try {
      const userExists = this.entries.find(user => user.login === username)
      
      if(userExists){
        throw new Error('usuario ja adicionado, digite um login diferente')
      }

      const searchUser = (await Github.search(username)) || "";

      if(searchUser.login === undefined){
        throw new Error('usuario nao encontrado')
      }

      console.log(this.entries)

      this.entries = [...this.entries, searchUser ]
      this.update()
      this.save()
      console.log(this.entries);
    } catch (error) {
      alert(error.message)
    }
  }

  save(){
    localStorage.setItem("@github-adicionados:",JSON.stringify(this.entries))
  }

  deleteUser(entry) {
    const filtrados = this.entries.filter((user) => {
      if (user.login !== entry.login) {
        return true;
      }
    });

    this.entries = filtrados;
    this.update();
    this.save();
  }
}

//class que vai criar a visualização e eventos do HTML
export class FavoritesView extends FavoritesData {
  constructor(recebenomain) {
    super(recebenomain);
    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.takeValueOfInput();
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((entry) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${entry.login}.png`;
      row.querySelector(".user a").href = `https://github.com/${entry.login}`;
      row.querySelector(".user p").textContent = entry.name;
      row.querySelector(".user span").textContent = `/${entry.login}`;
      row.querySelector(".repositories").textContent = `${entry.public_repos}`;
      row.querySelector(".followers").textContent = `${entry.followers}`;

      row.querySelector(".remove").onclick = () => {
        this.deleteUser(entry);
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td class="user">
        <img src="https://github.com/caueenrico.png" alt="" />
        <a href="https://github.com/caueenrico" target="_blank">
          <p>caueeeeeeeeeeeeee</p>
          <span>/maykbrito</span>
        </a>
      </td>
      <td class="repositories">89</td>
      <td class="followers">75</td>
      <td>
        <button class="remove">Remover</button>
      </td>`;

    return row;
  }

  removeAllTr() {
    this.tbody
      .querySelectorAll("tr")
      .forEach((trjaemtela) => trjaemtela.remove());
  }

  takeValueOfInput() {
    const ButtonFavoritar = this.root.querySelector("header button");

    ButtonFavoritar.onclick = () => {
      const input  = this.root.querySelector("input");

      this.addUser(input.value);

      input.value = ''
    };
  }
}
