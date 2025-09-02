export const CustomFullScreenLoading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <div className="w-16 h-16 border-8 border-black border-t-gray-300 rounded-full animate-spin" />
      <p className="text-black mt-6 text-lg">Espere un momento...</p>
    </div>
  );
};
