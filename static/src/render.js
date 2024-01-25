  const MENU = [
    {
      label: 'Startsida',
      link: '/',
    },
    {
      label: 'Filmer',
      link: '/filmer',
    },
    {
      label: 'Evenemang',
      link: '/evenemang',
    },
  ];

export async function renderPage(response, page, movieList, currentMovie) {
  let currentPath = (page == 'film') ? 'filmer' : page;
  currentPath = currentPath == 'index' ? '/' : `/${currentPath}`; // Smidigare sätt att göra detta på för att aktivera menyn för filmer även för enskild film-sida?
  response.render(page, {
    menu: MENU.map((item) => {
      return {
        label: item.label,
        link: item.link,
        status: currentPath == item.link ? 'active' : 'inactive',
      };
    }),
    movies: movieList,
    movie: currentMovie,
  });
}