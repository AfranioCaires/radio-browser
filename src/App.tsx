import { Header } from "./components/header/header";
import Player from "./components/player/player";
import { FavoritesList } from "./components/favorites/favorites-list";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="w-full">
      <Header />
      <main className="container mx-auto space-y-5 mt-2 p-2">
        <Player />
        <section className="space-y-4">
          <FavoritesList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
