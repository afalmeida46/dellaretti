export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="text-center space-y-4">
        <h1 className="text-8xl font-black" style={{ color: "#1f3d2b" }}>404</h1>
        <p className="text-gray-500 text-lg">Página não encontrada</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-3 rounded-xl text-white font-semibold text-sm"
          style={{ background: "#2e6b4d" }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
