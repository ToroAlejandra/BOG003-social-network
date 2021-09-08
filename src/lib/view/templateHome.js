import { signOut, addPost, dataPost, setPost } from '../utils/firebaseIndex.js';

/** Crear div que contiene template de home */
export const home = () => {
  const divHome = document.createElement('div');
  const viewHome = `
  <div class= 'body-home'>
    <div class= 'content-header'>
      <div class= 'header-home'>
        <img src= './images/bxs-face.svg' id='photo-user'></img>
        <p id='header-user'></p>
      </div>
    </div>

    <div class='feed' id='feed-post'>
    </div>

    <div class= 'content-menu'>
      <div class= 'nav-menu'>
        <img src= './images/bx-home-heart.svg' class='menu-option' id='home-page'></img>
        <img src= './images/bx-plus.svg' class='menu-option' id='add-post'></img>
        <img src= './images/bx-log-out.svg' class='menu-option' id='log-out'></img>
      </div>
    </div>
  </div>
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
  
    `;
  divHome.innerHTML = viewHome;

  const btnHome = divHome.querySelector('#home-page');
  btnHome.addEventListener('click', () => {
    window.location.hash = '#/home';
    console.log(window.location.hash);
  });

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
    document.querySelector('#text-post').value='';
  });

  const btnCloseModal = divHome.querySelector('#close-modal');
  btnCloseModal.addEventListener('click', () => {
    const divModalClose = document.querySelector('#modal');
    divModalClose.classList.remove('background-modal-show');
    divModalClose.classList.add('background-modal-none');
  });

  const btnLogOut = divHome.querySelector('#log-out');
  btnLogOut.addEventListener('click', () => {
    signOut();
    window.location.hash = '#/';
  });

  const btnNewPost = divHome.querySelector('#new-post');
  btnNewPost.addEventListener('click', () => {
    const divFeedPost = document.querySelector('#feed-post');
    const divNewPost = document.createElement('div');

    divNewPost.setAttribute('class', 'div-new-post');
    let textPost = document.createElement('p');
    let textPostContent = document.createElement('p');
    textPostContent.setAttribute('id', 'text-post-content')
    textPost = document.querySelector('#text-post').value;
    textPost = textPost.trim();

    if (textPost === '') {
      let inputText = document.querySelector('#text-post');
      inputText.placeholder = 'No puedes ingresar un campo vacío';
      document.querySelector('#input-content').classList.remove('content-input');
      document.querySelector('#input-content').classList.add('input-post-error');
      setTimeout(() => {
        inputText.placeholder = 'Exprésate';
        document.querySelector('#input-content').classList.remove('input-post-error');
        document.querySelector('#input-content').classList.add('content-input');
      }, 2000);
    } else {
      const divModalClose = document.querySelector('#modal');
      divModalClose.classList.add('background-modal-none');
      divModalClose.classList.remove('background-modal-show');
      window.location.hash = '#/home';
      addPost(textPost, 1);
      setTimeout(() => {
        currentData();
      }, 300)
    }
    document.querySelector('#text-post').value = '';
    // window.location.reload()
  });

  const nameCurrentUser = () => {
    const nameUser = firebase.auth().currentUser;
    if (nameUser) {
      document.querySelector('#header-user-post').textContent = nameUser.displayName;
      document.querySelector('#header-user').textContent = nameUser.displayName;
    }
    return nameUser.uid;
  };
  setTimeout(() => {
    console.log (nameCurrentUser());
    nameCurrentUser();
  }, 800)

  
  const currentData = () => {
    document.querySelector('#feed-post').innerHTML='';
    dataPost().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let divFeedPost = document.querySelector('#feed-post');
        const divNewPost = document.createElement('div');
        const divHeaderPost = document.createElement('div');
        const photoUser = document.createElement('img');
        const divInfoUser = document.createElement('div');
        let namePost = document.createElement('p');
        let textPost = document.createElement('p');
        textPost.setAttribute('class', 'text-post');
        divInfoUser.setAttribute('class', 'div-info-user');
        divHeaderPost.setAttribute('class', 'div-header-post');
        divNewPost.setAttribute('id', 'div-new-post');
        photoUser.src = './images/bxs-face.svg';
        textPost.textContent = doc.data().post;
        // console.log(doc.id);
        doc.data().userId.get().then((userDoc) => {
          // console.log(userDoc.data());
          namePost.textContent = userDoc.data().name;
          divInfoUser.appendChild(photoUser);
          divInfoUser.appendChild(namePost);
          divHeaderPost.appendChild(divInfoUser);
          divNewPost.appendChild(divHeaderPost);
          divNewPost.appendChild(textPost);
          divFeedPost.appendChild(divNewPost);
          if (nameCurrentUser() === userDoc.id){
            console.log ('hola');
          const divContentUpdate = document.createElement('div');
          const imgUpdate = document.createElement('img');
          const imgDelete = document.createElement('img');
          divContentUpdate.setAttribute('class', 'div-content-update');
          imgUpdate.src = './images/bx-pencil.svg';
          imgDelete.src = './images/bx-trash.svg';
          divHeaderPost.appendChild(divContentUpdate);
          divContentUpdate.appendChild(imgUpdate);
          divContentUpdate.appendChild(imgDelete);
          imgUpdate.addEventListener('click',() => {
            const divModal = document.querySelector('#modal');
            divModal.classList.remove('background-modal-none');
            divModal.classList.add('background-modal-show');
            const bntNewPost = document.querySelector('#new-post');
            bntNewPost.classList.remove('btn-post');
            bntNewPost.classList.add('btn-post-none');
            const bntUpdatePost = document.querySelector('#update-post');
            bntUpdatePost.classList.remove('btn-post-none');
            bntUpdatePost.classList.add('btn-post');
            document.querySelector('#text-post').value=doc.data().post;
            document.querySelector('#idPost').value=doc.id;
          }) 
          }
        })
      });
    })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  setTimeout(() => {
    currentData();
  }, 300)
  setTimeout(() => {
    document.querySelector('#update-post').addEventListener('click',() => {
      document.querySelector('#text-post').value
      setPost(document.querySelector('#idPost').value, document.querySelector('#text-post').value);
      setTimeout(() => {
        currentData();
      }, 100)
      const divModalClose = document.querySelector('#modal');
      divModalClose.classList.add('background-modal-none');
      divModalClose.classList.remove('background-modal-show');
     })
    },3) 
 // setPost();
  return divHome;
};
