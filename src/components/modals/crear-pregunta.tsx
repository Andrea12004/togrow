import React, { useState} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';

// Importamos useNavigate para la navegación aunque no lo usaremos por ahora
// import { useNavigate } from 'react-router-dom';
//import CategoriaModal from '/src/components/modals/modal-category-banco.jsx';

// Definimos las interfaces para los tipos de datos
interface FormData {
  Pregunta: string;
  Categoria: string;
  Respuesta1: string;
  Respuesta2: string;
  Respuesta3: string;
  Respuesta4: string;
  CorrectAnswer: string;
  Correcto1: boolean;
  Correcto2: boolean;
  Correcto3: boolean;
  Correcto4: boolean;
}

interface Category {
  id: string;
  category: string;
}

const Crearpregunta: React.FC = () => {
  // Por ahora comentamos el navigate ya que no usaremos el logout
  // const navigate = useNavigate();
  
  // Estados iniciales
  const [formData, setFormData] = useState<FormData>({
    Pregunta: '',
    Categoria: '',
    Respuesta1: '',
    Respuesta2: '',
    Respuesta3: '',
    Respuesta4: '',
    CorrectAnswer: '',
    Correcto1: false,
    Correcto2: false,
    Correcto3: false,
    Correcto4: false,
  });

  // Estado para las categorías (datos mock)
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', category: 'Matemáticas' },
    { id: '2', category: 'Ciencias' },
    { id: '3', category: 'Historia' },
    { id: '4', category: 'Literatura' },
  ]);

  // Estado para simular datos del usuario
  const [user] = useState({
    role: 'ADMIN' // Cambiar a 'BASIC' para probar diferentes vistas
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario (sin llamada a API)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones básicas
    if (formData.Pregunta === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor indica cual es la pregunta',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (formData.Respuesta1 === '' || formData.Respuesta2 === '' || formData.Respuesta3 === '' || formData.Respuesta4 === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todas las respuestas',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (formData.CorrectAnswer === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor indica cual es la respuesta correcta',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (formData.Categoria === '') {
      Swal.fire({
        title: 'Error',
        text: 'Por favor indica la categoría de la pregunta',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // Simulación de éxito (sin llamada a API)
    Swal.fire({
      title: 'Operación Exitosa',
      text: `Pregunta "${formData.Pregunta}" creada con éxito`,
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: "#25293d",
      confirmButtonText: `Ok`
    }).then((result) => {
      if (result.isConfirmed) {
        // Resetear formulario
        setFormData({
          Pregunta: '',
          Categoria: '',
          Respuesta1: '',
          Respuesta2: '',
          Respuesta3: '',
          Respuesta4: '',
          CorrectAnswer: '',
          Correcto1: false,
          Correcto2: false,
          Correcto3: false,
          Correcto4: false,
        });
        
        // Cerrar modal
        document.getElementById('pregunta')?.classList.add('hidden');
      }
    });
  };

  // Función para abrir/cerrar el modal
  const toggleModal = (show: boolean) => {
    const modal = document.getElementById('pregunta');
    if (modal) {
      if (show) {
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="button-question flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="pregunta"
        onClick={() => toggleModal(true)}
      >
        <img src="/svg/header/agregarheaderblanco.svg" alt="Crear Pregunta" />
        <img src="/svg/header/agregarheadernegro.svg" alt="Crear Pregunta" className="create-hover" />
        Crear Pregunta
      </button>

      {/* Modal */}
      <div
        id="pregunta"
        className="overlay modal hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        role="dialog"
        tabIndex={-1}
      >
        <div className="modal-dialog w-full max-w-3xl rounded-lg shadow-lg">
          <div 
            className="modal-content modal-content-pregunta" 
            style={{ backgroundColor: '#1F2336', height: '90%' }}
          >
            <div className="modal-header flex justify-between items-center p-4 border-gray-700">
              <h3 className="modal-title" style={{ color: '#FFF' }}>Crear Pregunta</h3>
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm"
                aria-label="Close"
                onClick={() => toggleModal(false)}
              >
                <img src="/svg/modals/close.svg" alt="Close" />
              </button>
            </div>

            <div className="modal-body" style={{ height: '100%', margin: '1%' }}>
              <div className='flex w-full justify-between mb-4'>
                <h6 className='titulos-azules'>¿Cuál será la pregunta?</h6>
                {/* {user.role === 'BASIC' ? '' : <CategoriaModal />} */}
              </div>

              <form 
                className="w-full h-[90%] flex flex-column gap-1 flex-wrap items-start"  
                onSubmit={handleSubmit}
              >
                <textarea 
                  className="inputs-categorias p-2" 
                  style={{ height: '10%', margin: '0%' }} 
                  placeholder="Escribe tu pregunta aquí"
                  name='Pregunta'
                  value={formData.Pregunta}
                  onChange={handleChange}
                  required
                />

                <h6 className='titulos-azules' style={{ margin: '0px' }}>
                  ¿A qué categoría pertenece la pregunta?
                </h6>

                <div className="radio-button-container w-full overflow-x-scroll">
                  {categories.length > 0 ? (
                    categories.map((item) => (
                      <div className="radio-button" key={item.id}>
                        <input 
                          type="radio" 
                          id={item.category} 
                          className="radio-button__input" 
                          checked={formData.Categoria === item.id}
                          name="Categoria" 
                          value={item.id} 
                          onChange={handleChange}
                        />
                        <label className="radio-button__label" htmlFor={item.category}>
                          <span className="radio-button__custom"></span>
                          {item.category}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className='text-white'>No hay categorías en este momento</p>
                  )}
                </div>

                <div className='div-respuestas w-full'>
                  <p className='titulos-azules' style={{ fontSize: '20px', margin: '0px' }}>
                    Respuesta 1
                  </p>

                  <div>
                    <input 
                      type="text" 
                      placeholder='Escribe tu respuesta #1' 
                      name="Respuesta1" 
                      value={formData.Respuesta1}
                      onChange={handleChange}
                    />
                    <div className="radio-button">
                      <input 
                        type="radio" 
                        id="radio1" 
                        className="radio-button__input" 
                        name="CorrectAnswer" 
                        value="Respuesta1" 
                        checked={formData.CorrectAnswer === 'Respuesta1'}
                        onChange={handleChange}
                      />
                      <label className="radio-button__label" htmlFor="radio1">
                        <span className="radio-button__custom"></span>
                        Respuesta correcta
                      </label>
                    </div>
                  </div>

                  <p className='titulos-azules' style={{ fontSize: '20px' }}>
                    Respuesta 2
                  </p>

                  <div>
                    <input 
                      type="text" 
                      placeholder='Escribe tu respuesta #2' 
                      name="Respuesta2" 
                      value={formData.Respuesta2}
                      onChange={handleChange}
                    />
                    <div className="radio-button">
                      <input 
                        type="radio" 
                        id="radio2" 
                        className="radio-button__input" 
                        name="CorrectAnswer" 
                        value="Respuesta2" 
                        checked={formData.CorrectAnswer === 'Respuesta2'}
                        onChange={handleChange}
                      />
                      <label className="radio-button__label" htmlFor="radio2">
                        <span className="radio-button__custom"></span>
                        Respuesta correcta
                      </label>
                    </div>
                  </div>

                  <p className='titulos-azules' style={{ fontSize: '20px' }}>
                    Respuesta 3
                  </p>

                  <div>
                    <input 
                      type="text" 
                      placeholder='Escribe tu respuesta #3' 
                      name="Respuesta3" 
                      value={formData.Respuesta3}
                      onChange={handleChange}
                    />
                    <div className="radio-button">
                      <input 
                        type="radio" 
                        id="radio3" 
                        className="radio-button__input" 
                        name="CorrectAnswer" 
                        value="Respuesta3" 
                        checked={formData.CorrectAnswer === 'Respuesta3'}
                        onChange={handleChange}
                      />
                      <label className="radio-button__label" htmlFor="radio3">
                        <span className="radio-button__custom"></span>
                        Respuesta correcta
                      </label>
                    </div>
                  </div>

                  <p className='titulos-azules' style={{ fontSize: '20px' }}>
                    Respuesta 4
                  </p>

                  <div>
                    <input 
                      type="text" 
                      placeholder='Escribe tu respuesta #4' 
                      name="Respuesta4" 
                      value={formData.Respuesta4}
                      onChange={handleChange}
                    />
                    <div className="radio-button">
                      <input 
                        type="radio" 
                        id="radio4" 
                        className="radio-button__input" 
                        name="CorrectAnswer" 
                        value="Respuesta4" 
                        checked={formData.CorrectAnswer === 'Respuesta4'}
                        onChange={handleChange}
                      />
                      <label className="radio-button__label" htmlFor="radio4">
                        <span className="radio-button__custom"></span>
                        Respuesta correcta
                      </label>
                    </div>
                  </div>
                  
                  <div 
                    className="w-full h-full gap-2 flex" 
                    style={{ height: '10%', margin: '0%', background: 'transparent' }}
                  >
                    <button 
                      type="button" 
                      className="button-close-modal" 
                      onClick={() => toggleModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="button-send-modal">
                      Crear Pregunta
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crearpregunta;