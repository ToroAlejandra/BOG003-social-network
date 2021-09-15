import {
  signOut, addPost, dataPost, setPost, removeLike, deletePost, addLike, getCurrentUser,
} from '../utils/firebaseIndex.js';

/** Crear div que contiene template de home */
export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
  <section class= 'body-home'>
   <div class='header-feed'>
    <div class= 'content-header'>
      <div class= 'header-home'>
        <img src= './images/bxs-face.svg' id='photo-user'></img>
        <p id='header-user'></p>
      </div>
    </div>

    <div class='feed' id='feed-post'>
    </div>
  </div>
    <div class= 'content-menu'>
      <div class = 'menu-title-icon'>
        <div class= 'nav-menu'>
          <img src= './images/bx-home-heart.svg' class='menu-option' id='home-page'></img>
          <img src= './images/bx-plus.svg' class='menu-option' id='add-post'></img>
          <img src= './images/bx-log-out.svg' class='menu-option' id='log-out'></img>
        </div>
      </div> 
    </div>
  </section>
    <div class= 'background-modal-none' id ='modal'>
      <div class= 'post-modal'>
        <div class= 'content-modal'>
          <div class= 'header-modal'>
            <div class='user-modal'>
            <img src= './images/bxs-face.svg'></img>
            <p id='header-user-post'></p>
            </div> 
            <img src= './images/bx-x.svg' id='close-modal'></img>
        </div>
          <div id='input-content' class='content-input'>
            <textarea class='input-post' id='text-post' type='text' placeholder='¡Exprésate!' ></textarea>
          </div> 
          <div class='btn-content'>
            <button class ='btn-post' id='new-post'>Visibilizar</button>
            <button class ='btn-post' id='update-post'>Editar</button>
            <p id='idPost'></p>
          </div>  
        </div>
      </div>
    </div>
    <div class= 'background-modal-delete-none' id='modal-delete'>
      <div class= 'modal-delete'>
        <div class= 'content-modal-delete'>
          <h3>¿Eliminar <br> publicación?</h3>
          <p>¿Seguro que quieres eliminar esta publicación?</p>
            <div class='btn-confirm-delete'>
              <button class ='btn-delete' id='btn-delete'>Eliminar</button>
              <button class ='btn-cancel' id='btn-cancel'>Cancelar</button>
            </div>
        </div>
      </div>
    </div>
    `;
  divHome.innerHTML = viewHome;

  /** Este evento permite recagar la pagina de home */
  const btnHome = divHome.querySelector('#home-page');
  btnHome.addEventListener('click', () => {
    window.location.reload();
  });
  /** Este evento permite abrir una modal para escribir un nuevo post */
  const btnAddPost = divHome.querySelector('#add-post');
  btnAddPost.addEventListener('click', () => {
    const divModal = document.querySelector('#modal');
    divModal.classList.remove('background-modal-none');
    divModal.classList.add('background-modal-show');
    const bntNewPost = document.querySelector('#new-post');
    bntNewPost.classList.remove('btn-post-none');
    bntNewPost.classList.add('btn-post');
    const bntUpdatePost = document.querySelector('#update-post');
    bntUpdatePost.classList.remove('btn-post');
    bntUpdatePost.classList.add('btn-post-none');
    document.querySelector('#text-post').value = '';
  });
  /** Este evento permite cerrar la modal */
  const btnCloseModal = divHome.querySelector('#close-modal');
  btnCloseModal.addEventListener('click', () => {
    const divModalClose = document.querySelector('#modal');
    divModalClose.classList.remove('background-modal-show');
    divModalClose.classList.add('background-modal-none');
  });
  /** Este evento permite cerrar sesión */
  const btnLogOut = divHome.querySelector('#log-out');
  btnLogOut.addEventListener('click', () => {
    signOut();
    window.location.hash = '#/';
  });
  /** funcion para que el usuario ingrese a home si está verificado */
  getCurrentUser();

  /** Este evento permite crear el post y cerrar la modal */
  const btnNewPost = divHome.querySelector('#new-post');
  btnNewPost.addEventListener('click', () => {
    const divNewPost = document.createElement('div');
    divNewPost.setAttribute('class', 'div-new-post');
    let textPost = document.createElement('p');
    const textPostContent = document.createElement('p');
    textPostContent.setAttribute('id', 'text-post-content');
    textPost = document.querySelector('#text-post').value;
    textPost = textPost.trim(); // Devulve la cadena de texto sin espacios al principio y al final
    /** si hay un campo vacio se envia el aviso de error */
    if (textPost === '') {
      const inputText = document.querySelector('#text-post');
      inputText.placeholder = 'No puedes ingresar un campo vacío';
      document.querySelector('#input-content').classList.remove('content-input');
      document.querySelector('#input-content').classList.add('input-post-error');
      setTimeout(() => {
        inputText.placeholder = 'Exprésate';
        document.querySelector('#input-content').classList.remove('input-post-error');
        document.querySelector('#input-content').classList.add('content-input');
      }, 2000);
      /** al haber texto se cierra la modal y se ejecuta addPost
       * (Se ejecuta la creación de la colección en firebase) */
    } else {
      const divModalClose = document.querySelector('#modal');
      divModalClose.classList.add('background-modal-none');
      divModalClose.classList.remove('background-modal-show');
      window.location.hash = '#/home';
      addPost(textPost);
    }
    document.querySelector('#text-post').value = '';
  });
  /** Esta función trae el usuario actual, asigna al header, al post y retorna el id del usuario  */
  const nameCurrentUser = () => {
    const nameUser = firebase.auth().currentUser;
    if (nameUser) {
      document.querySelector('#header-user-post').textContent = nameUser.displayName;
      document.querySelector('#header-user').textContent = nameUser.displayName;
    }
    return nameUser.uid;
  };
  setTimeout(() => {
    nameCurrentUser();
  }, 800);
  /** Esta funcion llama a datapost (trae la colección) */
  const currentData = () => {
    /** onSnapshot realiza actualizaciones en tiempo real */
    dataPost().onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        document.querySelector('#feed-post').innerHTML = '';
        const divFeedPost = document.querySelector('#feed-post');
        const divNewPost = document.createElement('div');
        divNewPost.setAttribute('id', 'div-new-post');
        const divHeaderPost = document.createElement('div');
        divHeaderPost.setAttribute('class', 'div-header-post');
        const photoUser = document.createElement('img');
        photoUser.src = './images/bxs-face.svg';
        const divInfoUser = document.createElement('div');
        divInfoUser.setAttribute('class', 'div-info-user');
        const namePost = document.createElement('p');
        const textPost = document.createElement('p');
        textPost.setAttribute('class', 'text-post');
        textPost.textContent = doc.data().post;
        doc.data().userId.get().then((userDoc) => {
          const numLikes = document.createElement('p');
          const divLikes = document.createElement('div');
          divLikes.setAttribute('class', 'div-likes');
          const divContentLikes = document.createElement('div');
          divContentLikes.setAttribute('class', 'div-content-likes');
          const imgLike = document.createElement('img');
          imgLike.setAttribute('id', 'img-like');
          numLikes.textContent = doc.data().likes.length;
          if (doc.data().likes.includes(nameCurrentUser())) {
            console.log('pone');
            imgLike.classList.remove('img-like-show');
            imgLike.classList.add('img-like-none');
            imgLike.src = './images/heartLike.svg';
          } else {
            imgLike.classList.remove('img-like-none');
            imgLike.classList.add('img-like-show');
            imgLike.src = './images/heart.svg';
          }
          namePost.textContent = userDoc.data().name;
          divInfoUser.appendChild(photoUser);
          divInfoUser.appendChild(namePost);
          divHeaderPost.appendChild(divInfoUser);
          divNewPost.appendChild(divHeaderPost);
          divNewPost.appendChild(textPost);
          divContentLikes.appendChild(imgLike);
          divContentLikes.appendChild(numLikes);
          divLikes.appendChild(divContentLikes);
          divNewPost.appendChild(divLikes);
          divFeedPost.appendChild(divNewPost);
          /** si el id del usuario actual es igual al id del creador del post
           * le muestra las opciones editar y borrar */
          if (nameCurrentUser() === userDoc.id) {
            const divContentUpdate = document.createElement('div');
            const imgUpdate = document.createElement('img');
            const imgDelete = document.createElement('img');
            divContentUpdate.setAttribute('class', 'div-content-update');
            imgUpdate.src = './images/bx-pencil.svg';
            imgDelete.src = './images/bx-trash.svg';
            divHeaderPost.appendChild(divContentUpdate);
            divContentUpdate.appendChild(imgUpdate);
            divContentUpdate.appendChild(imgDelete);
            imgUpdate.addEventListener('click', () => {
              const divModal = document.querySelector('#modal');
              divModal.classList.remove('background-modal-none');
              divModal.classList.add('background-modal-show');
              const bntNewPost = document.querySelector('#new-post');
              bntNewPost.classList.remove('btn-post');
              bntNewPost.classList.add('btn-post-none');
              const bntUpdatePost = document.querySelector('#update-post');
              bntUpdatePost.classList.remove('btn-post-none');
              bntUpdatePost.classList.add('btn-post');
              document.querySelector('#text-post').value = doc.data().post;
              document.querySelector('#idPost').value = doc.id;
            });
            imgDelete.addEventListener('click', () => {
              const divModalDelete = document.querySelector('#modal-delete');
              divModalDelete.classList.remove('background-modal-delete-none');
              divModalDelete.classList.add('background-modal-delete');
              document.querySelector('#btn-delete').value = doc.id;
            });
          }
          /** este evento permite dar un solo like o quitarlo */
          imgLike.addEventListener('click', () => {
            if (doc.data().likes.includes(nameCurrentUser())) {
              removeLike(doc.id, nameCurrentUser());
            } else {
              addLike(doc.id, nameCurrentUser());
            }
          });
        });
      });
    });
  };

  setTimeout(() => {
    currentData();
  }, 300);

  setTimeout(() => {
    /** este evento permite actualizar el post en la colección y cierra la modal */
    document.querySelector('#update-post').addEventListener('click', () => {
      setPost(document.querySelector('#idPost').value, document.querySelector('#text-post').value);
      const divModalClose = document.querySelector('#modal');
      divModalClose.classList.add('background-modal-none');
      divModalClose.classList.remove('background-modal-show');
    });
  }, 3);
  /** este evento permite eliminar el post  */
  setTimeout(() => {
    document.querySelector('#btn-delete').addEventListener('click', () => {
      deletePost(document.querySelector('#btn-delete').value);
      console.log(document.querySelector('#btn-delete').value);
      const divModalDelete = document.querySelector('#modal-delete');
      divModalDelete.classList.remove('background-modal-delete');
      divModalDelete.classList.add('background-modal-delete-none');
    });
  }, 3);
  /** este evento muestra modal de confirmación para eliminar post */
  setTimeout(() => {
    document.querySelector('#btn-cancel').addEventListener('click', () => {
      const divModalDelete = document.querySelector('#modal-delete');
      divModalDelete.classList.remove('background-modal-delete');
      divModalDelete.classList.add('background-modal-delete-none');
    });
  }, 3);
  return divHome;
};

setTimeout(() => {
  // eslint-disable-next-line
  if (screen.width >= 768) {
    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'div-title');
    const navHome = document.createElement('p');
    navHome.textContent = 'Inicio';
    const navAddPost = document.createElement('p');
    navAddPost.textContent = 'Crear post';
    const navLogOut = document.createElement('p');
    navLogOut.textContent = 'Cerrar sesión';
    divTitle.appendChild(navHome);
    divTitle.appendChild(navAddPost);
    divTitle.appendChild(navLogOut);
    document.querySelector('.menu-title-icon').appendChild(divTitle);
  }
}, 300);
