import { useRouter } from "next/router";

export default function Modal({ setModal, handleDelete }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 p-4">
            <h1> Eliminar canción</h1>
            <p className="text-base text-gray-700">
              ¿Estás seguro de que quieres eliminar esta canción?
            </p>
          </div>
          <div className="flex-1 p-4 text-gray-50">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="px-4 py-2 font-bold text-white transition-colors bg-red-500 rounded-full hover:bg-red-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-green-500 rounded-full hover:bg-green-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SucessModal({ setModal, authorId }) {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center px-4 pb-4 bg-gray-800 bg-opacity-60 sm:inset-0 sm:p-0">
      <div className="shadow bg-gray-50 sm:rounded-lg sm:overflow-hidden">
        <div className="flex flex-col break-words bg-white">
          <div className="flex-1 p-4">
            <h1> Exito</h1>
            <p className="text-base text-gray-700">
              La canción se ha creado con éxito.
            </p>
          </div>
          <div className="flex-1 p-4 text-gray-50">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModal(false);
                  router.back();
                }}
                className="px-4 py-2 ml-4 font-bold text-white transition-colors bg-green-500 rounded-full hover:bg-green-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
