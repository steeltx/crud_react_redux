import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);
            // si todo esta bien
            dispatch(agregarProductoExito(producto));

            // alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            );
        } catch (err) {
            // si hay error, cambiar el state
            dispatch(agregarProductoError(true));
            
            // alerta de error
            Swal.fire({
                icon: 'error',
                title:'Hubo un error',
                text: 'Hubo un error'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// si el producto se guarda en la bd
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});