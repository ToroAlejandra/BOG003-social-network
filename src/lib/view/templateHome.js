import { signOut, setPost, dataPost } from '../utils/firebaseIndex.js';

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
          </div>  
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
    let textPost = document.createElement('p');
    textPost = document.querySelector('#text-post').value;
    textPost = textPost.trim();
    divNewPost.innerHTML = textPost;
    divFeedPost.appendChild(divNewPost);
    
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
    }
    document.querySelector('#text-post').value='';
    setPost( textPost, 1 );
    //console.log(dataPost()); 
  });
  return divHome;
};

const nameCurrentUser = () => { firebase
  .auth().onAuthStateChanged((user) => {
    document.querySelector('#header-user-post').textContent = user.displayName; 
    document.querySelector('#header-user').textContent = user.displayName;
     }
     )};

nameCurrentUser();

const currentData = () => {
  const divFeedPost = document.querySelector('#feed-post');
  dataPost().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     // console.log(doc.id, " => ", doc.data());
      const divNewPost = document.createElement('div');
      divNewPost.setAttribute('id', 'div-new-post');
      let namePost = document.createElement('p');
      let textPost = document.createElement('p');
      textPost.textContent = doc.data().post;
      namePost.textContent = doc.data().name;
      divNewPost.appendChild(namePost);
      divNewPost.appendChild(textPost);
      document.querySelector('#feed-post').appendChild(divNewPost);
    });
  })
.catch((error) => {
  console.log("Error getting documents: ", error);
});
}
currentData();
