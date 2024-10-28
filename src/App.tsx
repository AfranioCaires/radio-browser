import { ThemeModeToggle } from "./components/dark-theme/mode-toggle";
import { Header } from "./components/header/header";
import Player from "./components/player/player";
import { FavoritesList } from "./components/favorites/favorites-list";

function App() {
  return (
    <div className="w-full">
      <Header />
      <main className="container mx-auto space-y-5 mt-2 p-2">
        <Player />
        <section className="space-y-4">
          <FavoritesList />
        </section>
        <ThemeModeToggle />
      </main>
    </div>
  );
}

export default App;
