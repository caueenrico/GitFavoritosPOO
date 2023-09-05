export class Github {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    return fetch(endpoint)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({ //algo importante: colocando a função dessa forma "({})" ela ja vai me retornar em forma de objeto, modo tradicional comentado abaixo
        login, 
        name,
        public_repos,
        followers,
      }));
      /*.then((data) => {
        const {login, name, public_repos, followers } = data 

        return {
          login, 
          name,
          public_repos,
          followers,
        } 
      })*/
  }
}