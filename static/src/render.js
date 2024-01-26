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

export async function renderPage(res, page, movieList, currentMovie) {
  const statusCode = (page == 'error') ? 404 : 200;
  let currentPath = (page == 'film') ? 'filmer' : page;
  currentPath = currentPath == 'index' ? '/' : `/${currentPath}`; // Smidigare sätt att göra detta på för att aktivera menyn för filmer även för enskild film-sida?
  res.status(statusCode).render(page, {
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