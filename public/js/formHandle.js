
'use-strict';

// declaration

const signup = document.querySelector('#signup');
const referral = document.querySelector('#referral');
const validatereferral = document.querySelector('#referralval');
const resetToken  = document.querySelector('#reset');
const signIn = document.querySelector('#signIn');
const updateBtn = document.querySelector('.btn-save');
const searchBtn = document.querySelector('.searchUser');
const flwParent = document.querySelector('#flw-delg');
const followers = document.querySelector('.followers');
const postForm = document.querySelector('#post-form');
const resourceForm = document.querySelector('#resource-form');
const sendBtn = document.querySelector('.btn-send');
const notifBtn = document.querySelectorAll('.notif-btn');
const filterBtn = document.querySelector('.filter-button')

// formHandling functions

function register_user(e){
    // stop default action
    e.preventDefault();

    const  button = this.children[this.children.length-1];

    //Form Handling with ajax

    $.ajax({
        url      : '/register',
        method 	 : 'POST',
        data   	 :  $(this).serialize(),
        dataType :  'json',

        beforeSend : function(http){
            button.style.opacity = '0.7';
            button.innerText = 'Submitting';
            button.setAttribute("disabled", "true");
        },
        success    : function(response,status,http){
            let message = response.msg,
                element = response.param,
                success = response.success,
                id      = "error",
                icon   = "fa-times-circle",
                flashModal = document.querySelector('#flashModal .modal-body');

            if(element)  document.querySelector(`[name=${element}]`).value = "" ;

            if(success) {
                id = "success";
                icon = "fa-check-square";
                document.querySelector("form").reset();
            }

            flashModal.innerHTML = `<div id="${id}" class="flash">
                        			  <i class="fa ${icon}"></i>
                          			  <p class="lead" style="color:#a9a9a9">${message}</p>
                      				</div>`;

            //show flashModal
            $('#flashModal').modal('show');

            if(success){
                window.addEventListener("click", function(){
                    window.location.href = "/";
                });
            }


            // set as default
            button.style.opacity = '1';
            button.innerText = 'Sign up';
            button.removeAttribute("disabled");


        },

        error  : function(http,status,error){
            console.log("Error:"+error);
            flashModal.innerHTML = `<div id="error" class="flash">
                        			 		 <i class="fa fa-times-circle"></i>
                          			  		<p class="lead" style="color:#a9a9a9">Something went wrong here.</p>
                      					</div>`;
            // set as default
            button.style.opacity = '1';
            button.removeAttribute("disabled");
        }

    });

}

function upload_resource(e){
    console.log("Inside upload res:")   ;
    // stop default action
    e.preventDefault();
    if(imgDialog.files[0]){
        if(!validateFile()){
            window.alert("Invalid file type.");
            return;
        }
    }

    const  button = this.children[this.children.length-1];

    //Form Handling with ajax

    $.ajax({

        url      : '/saveresource',
        type: 'post',
        data: new FormData(this),
        processData: false,
        contentType: false,
        dataType: 'json',

        beforeSend : function(http){
            button.style.opacity = '0.7';
            button.innerText = 'Submitting';
            button.setAttribute("disabled", "true");
        },
        success    : function(response,status,http){
            console.log("success");
            let message = response.msg,
                element = response.param,
                success = response.success,
                id      = "error",
                icon   = "fa-times-circle",
                flashModal = document.querySelector('#flashModal .modal-body');

            if(element)  document.querySelector(`[name=${element}]`).value = "" ;

            if(success) {
                id = "success";
                icon = "fa-check-square";
                document.querySelector("form").reset();
            }

            flashModal.innerHTML = `<div id="${id}" class="flash">
                        			  <i class="fa ${icon}"></i>
                          			  <p class="lead" style="color:#a9a9a9">${message}</p>
                      				</div>`;

            //show flashModal
            $('#flashModal').modal('show');

            if(success){
                window.addEventListener("click", function(){
                    window.location.href = "/";
                });
            }


            // set as default
            button.style.opacity = '1';
            button.innerText = 'Sign up';
            button.removeAttribute("disabled");


        },

        error  : function(http,status,error){
            console.log("Error:"+error);
            flashModal.innerHTML = `<div id="error" class="flash">
                        			 		 <i class="fa fa-   times-circle"></i>
                          			  		<p class="lead" style="color:#a9a9a9">Something went wrong here.</p>
                      					</div>`;
            // set as default
            button.style.opacity = '1';
            button.removeAttribute("disabled");
        }

    });

}

function send_referrallink(e){
    // stop default action
    e.preventDefault();

    const  button = this.children[this.children.length-1];

    //Form Handling with ajax

    $.ajax({

        url      : '/referral',
        method 	 : 'POST',
        data   	 :  $(this).serialize(),
        dataType :  'json',

        beforeSend : function(http){
            button.style.opacity = '0.7';
            button.innerText = 'Submitting';
            button.setAttribute("disabled", "true");
        },
        success    : function(response,status,http){
            let message = response.msg,
                element = response.param,
                success = response.success,
                id      = "error",
                icon   = "fa-times-circle",
                flashModal = document.querySelector('#flashModal .modal-body');

            if(element)  document.querySelector(`[name=${element}]`).value = "" ;

            if(success) {
                id = "success";
                icon = "fa-check-square";
                document.querySelector("form").reset();
                button.removeAttribute("disabled");
            }

            flashModal.innerHTML = `<div id="${id}" class="flash">
                        			  <i class="fa ${icon}"></i>
                          			  <p class="lead" style="color:#a9a9a9">${message}</p>
                      				</div>`;

            //show flashModal
            $('#flashModal').modal('show');

            if(success){
                window.addEventListener("click", function(){
                    window.location.href = "/";
                });
            }

        },

        error  : function(http,status,error){
            console.log("Error:"+error);
            flashModal.innerHTML = `<div id="error" class="flash">
                        			 		 <i class="fa fa-times-circle"></i>
                          			  		<p class="lead" style="color:#a9a9a9">Something went wrong here.</p>
                      					</div>`;
            // set as default
            button.style.opacity = '1';
            button.removeAttribute("disabled");
        }

    });
}

function filterResources(e){
    console.log("In function filter")
    // stop default action
    e.preventDefault();

    const  button = this.children[this.children.length-1];

    //Form Handling with ajax

    $.ajax({

        url      : '/resourcefilter',
        method 	 : 'POST',
        data   	 :  $(this).serialize(),
        dataType :  'json',

        beforeSend : function(http){
            button.style.opacity = '0.7';
            button.innerText = 'Submitting';
            button.setAttribute("disabled", "true");
        },
        success    : function(response,status,http){
            let message = response.msg,
                element = response.param,
                success = response.success,
                id      = "error",
                icon   = "fa-times-circle",
                flashModal = document.querySelector('#flashModal .modal-body');

            if(element)  document.querySelector(`[name=${element}]`).value = "" ;

            if(success) {
                id = "success";
                icon = "fa-check-square";
                document.querySelector("form").reset();
                button.removeAttribute("disabled");
            }

            flashModal.innerHTML = `<div id="${id}" class="flash">
                        			  <i class="fa ${icon}"></i>
                          			  <p class="lead" style="color:#a9a9a9">${message}</p>
                      				</div>`;

            //show flashModal
            $('#flashModal').modal('show');

            if(success){
                window.addEventListener("click", function(){
                    window.location.href = "/";
                });
            }

        },

        error  : function(http,status,error){
            console.log("Error:"+error);
            flashModal.innerHTML = `<div id="error" class="flash">
                        			 		 <i class="fa fa-times-circle"></i>
                          			  		<p class="lead" style="color:#a9a9a9">Something went wrong here.</p>
                      					</div>`;
            // set as default
            button.style.opacity = '1';
            button.removeAttribute("disabled");
        }

    });
}



function send_Token(e){
    //stop default action
    e.preventDefault();

    const  button = this.children[this.children.length-1];


    //send token request to post route

    $.ajax({
        url : '/sendToken',
        method : 'POST',
        data : $(this).serialize(),
        dataType : 'json',

        beforeSend : function(http){
            button.style.opacity = "0.4";
            button.setAttribute("disabled", "true");
            button.textContent = "Sending";
        },

        success : function(response,status,http){
            let message = response.msg,
                success = response.success;

            if(success) {
                document.querySelector('#flash').innerHTML = `<p class="lead" style="color:#8bc34a;font-size:1em;font-weight:500;">${message}</p>`;
                resetToken.reset();
            }else{
                document.querySelector('#flash').innerHTML = `<p class="lead" style="color:#f44336;font-size:1em;font-weight:500;">${message}</p>`;
                resetToken.reset();
            }

            //set default
            button.style.opacity = "1";
            button.removeAttribute("disabled");
            button.textContent = "Reset";

        },

        error : function(http,status,error){
            console.log("Error:"+error);
            document.querySelector('#flash').innerHTML = `<p class="lead" style="color:#f44336;font-size:1em;font-weight:500;">Something wentghgs wrong.</p>`;
            resetToken.reset();
        }
    });

}



function update_user(){


    let fullname = document.querySelector('[name="fullname"]');
    let username =  document.querySelector('[name="username"]');
    let bio =  document.querySelector('[name="bio"]');

    let data = {fullname:fullname.value,username:username.value,bio:bio.value};

    $.ajax({
        method : 'POST',
        data :   data,
        dataType : 'json',

        beforeSend : function(){
            document.querySelector('.btn-save').style.opacity = "0.7";
        },

        success : function(response){

            let message = response.msg,
                success = response.success,
                html;

            if(success) {

                html =  `<div class="alert alert-success " role="alert">
                      ${message}
                    </div>`;
                document.querySelector("#updateForm .lead").textContent = bio.value;
                document.querySelector("#updateForm b").textContent = username.value;
                document.querySelector("#updateForm span").textContent = fullname.value;

            }else{
                html =  `<div class="alert alert-danger " role="alert">
                    	  ${message}
                      </div>`;
            }

            document.querySelector('#flash').innerHTML = html;
            document.querySelector('.btn-save').style.opacity = "1";

        },
        error: function(){
            console.log("Error:"+error);
            var html =  `<div class="alert alert-danger" role="alert">
                    </div>`;

            document.querySelector('#flash').innerHTML = html;

        }
    });


}

function change_password(id){

    let oldPassword = document.querySelector('[name="oldPassword"]');
    let newPassword =  document.querySelector('[name="newPassword"]');
    let confirm =  document.querySelector('[name="confirmPassword"]');


    let data = {oldPassword:oldPassword.value,newPassword:newPassword.value,confirm:confirm.value};

    $.ajax({
        url : '/change_password/'+id,
        method : 'POST',
        data :   data,
        dataType : 'json',

        beforeSend : function(){
            document.querySelector('.btn-change').style.opacity = "0.7";
        },

        success : function(response){

            let message = response.msg,
                success = response.success,
                html;

            if(success) {

                html =  `<div class="alert alert-success " role="alert">
                      ${message}
                    </div>`;

            }else{
                html =  `<div class="alert alert-danger " role="alert">
                    	  ${message}
                      </div>`;
            }

            document.querySelector('#flash').innerHTML = html;
            document.querySelector('#updateForm').reset();
            document.querySelector('.btn-change').style.opacity = "1";

        },
        error: function(){
            console.log("Error here");
            var html =  `<div class="alert alert-danger " role="alert">
                      Something went here wrong.
                    </div>`;

            document.querySelector('#flash').innerHTML = html;
        }
    });

}

function updatePhoto(){
    console.log("Update");
    var formData = new FormData();
    formData.append('upload',imgDialog.files[0]);

    $.ajax({
        url:'/upload',
        type: 'POST',
        data : formData,
        processData : false,
        contentType : false,
        beforeSend : function(){
            document.querySelector('.bio img').style.opacity  = '0.4';
        },
        success:function(response){
            let message = response.msg,
                success = response.success,
                image   = response.image;

            if(success) {
                document.querySelector('.bio img').setAttribute('src',image);
            }

            document.querySelector('.bio img').style.opacity  = '1';
        }
    });

}


function findUser(){

    let userId = document.querySelector('[type="hidden"]').value;


    $.ajax({
        url: '/findUser',
        type : 'GET',
        data : {term : this.value},
        dataType : 'json',
        success : function(response){


            let users = response;
            let data = users.map(user => {
                let html  = `<li>
                        <a href="/profile/${user._id}">`;
                if(user.image.includes("http")){
                    html += `<img src="${user.image}" alt="" class="mr-3 mt-2">`;
                }else{
                    html += `<img src="../images/profile/${user.image}" alt="" class="mr-3 mt-2">`
                }
                html += `<b>${user.fullname}</b>`;
                if(userId == user._id){
                    html += `<i class="mr-3">(you)</i>`;
                }
                html +=  `<span>${user.username}</span>
                        <span class="sm-msg">Followed by ${user.followers.length} persons.</span>
                      </a>
                  </li>`;

                if(window.innerWidth < 768){
                    html = `<li class="px-2 py-4">
                          <a href="/profile/${user._id}" style="position:relative;">`;

                    if(user.image.includes("http")){

                        html += `<img src="${user.image}" alt="" class="mr-3" style="width:70px;height:70px">`;

                    }else{

                        html += `<img src="../images/profile/${user.image}" alt="" class="mr-3" style="width:70px;height:70px">`;

                    }

                    html  +=  `<b style="position:absolute;top:2%;color:#222">${user.fullname}</b>
                            <span class="mt-2">${user.username}</span>`;

                    if(userId != user._id){
                        isFollow = user.followers.find(user => user == userId );
                        if(!isFollow){
                            html +=    `<button id="follow" data-user='{"id":"${user._id}"}' name="button" class="btn btn-info btn-sm" style="text-transform:uppercase;letter-spacing:1px;position: absolute;top: 17%;right:5%;">Follow</button>`;
                        }else{
                            html +=    `<button id="unfollow" data-user='{"id":"${user._id}"}' name="button" class="btn btn-danger btn-sm" style="text-transform:uppercase;letter-spacing:1px;position: absolute;top: 17%;right:5%;">Unfollow</button>`;
                        }
                    }

                    html  +=  `</a>
                            </li>`;
                }

                return html;
            }).join("");

            document.querySelector('.sub-search').style.display = 'block';
            if(response.length>0){
                document.querySelector('.sub-search').innerHTML = (window.innerWidth>768) ? `<ul>${data}</ul>`: data;
            }else{
                data = `<p class="lead py-2 px-3" style="text-align:center;color:#a9a9a9;"><i class="fa fa-search mr-3"></i>No result found.</p>`;
                document.querySelector('.sub-search').innerHTML = data;
            }
        }
    });

}

function add_follow(e){

    let data = JSON.parse(e.target.dataset.user);


    $.ajax({
        url: '/follow',
        method : 'POST',
        data : data,
        dataType : 'json',
        success : function(response){
            if(response.success){
                if(flwParent){
                    flwParent.innerHTML = `<button id="unfollow" class="btn-follow" data-user='{"id":"${data.id}"}'><i class="fa fa-user-times"></i> Unfollow</button>`;
                    followers.innerHTML = `<b>${parseInt(followers.textContent)+1}</b>`;
                }
                if(subSearch){
                    var button = e.target;
                    button.setAttribute('id', 'unfollow');
                    button.classList.remove('btn-info');
                    button.classList.add('btn-danger');
                    button.textContent = "unfollow";
                }
            }
        }
    });

}

function validate_referral(e){
    // stop default action
    e.preventDefault();

    const  button = this.children[this.children.length-1];
    console.log("Button");
    //Form Handling with ajax
    $.ajax({

        url      : '/validatereferral',
        method 	 : 'POST',
        data   	 :  $(this).serialize(),
        dataType :  'json',

        beforeSend : function(http){
            button.style.opacity = '0.7';
            button.innerText = 'Submitting';
            button.setAttribute("disabled", "true");
        },
        success    : function(response,status,http){
            let message = response.msg,
                element = response.param,
                success = response.success,
                id      = "error",
                icon   = "fa-times-circle",
                flashModal = document.querySelector('#flashModal .modal-body');

            if(element) {
                console.log(element);
                document.querySelector(`[name=${element}]`).value = "";
            }

            if(success) {
                id = "success";
                icon = "fa-check-square";
                document.querySelector("form").reset();
            }

            flashModal.innerHTML = `<div id="${id}" class="flash">
                        			  <i class="fa ${icon}"></i>
                          			  <p class="lead" style="color:#a9a9a9">${message}</p>
                      				</div>`;

            //show flashModal
            $('#flashModal').modal('show');

            if(success){
                window.addEventListener("click", function(){
                    window.location.href = "/signup";
                });
            }


        },

        error  : function(http,status,error){
            console.log("Error:"+error);
            flashModal.innerHTML = `<div id="error" class="flash">
                        			 		 <i class="fa fa-times-circle"></i>
                          			  		<p class="lead" style="color:#a9a9a9">Something went wrong here.</p>
                      					</div>`;
            // set as default
            button.style.opacity = '1';
            button.removeAttribute("disabled");
        }

    });
}

function delete_follow(e){
    let data = JSON.parse(e.target.dataset.user);

    $.ajax({
        url: '/unfollow',
        method : 'POST',
        data : data,
        dataType : 'json',
        success : function(response){
            if(response.success){
                if(flwParent){
                    flwParent.innerHTML = `<button id="follow" class="btn-follow" data-user='{"id":"${data.id}"}'><i class="fa fa-user-plus"></i> Follow</button>`;
                    followers.innerHTML = `<b>${parseInt(followers.textContent)-1}</b>`;
                }
                if(subSearch){
                    var button = e.target;
                    button.setAttribute('id', 'follow');
                    button.classList.remove('btn-danger');
                    button.classList.add('btn-info');
                    button.textContent = "follow";
                }

            }
        }
    });

}

function validateFile(){

    var types = ['image/jpeg','image/png'];
    types  = types.find(type => type == imgDialog.files[0].type);
    if(!types){
        return false;
    }

    return true;
}

function savePost(e){

    e.preventDefault();

    let progressBar = document.querySelector('.progress-bar');

    if(imgDialog.files[0]){
        if(!validateFile()){
            window.alert("Invalid file type.");
            return;
        }
    }
    //trial
    function refreshDiv() { //make sure braces are on the same line as the block statement, it's a good convention in JS

        document.getElementById("getelebyid").innerHTML = "Some <strong>HTML</strong> <em>string</em>" ;
        console.log("checking refresh");
    }

    window.setInterval(refreshDiv, 3000);


//function savePost() {
    $.ajax({
        url: '/savepost',
        type: 'post',
        data: new FormData(this),
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (response) {
            if (!response.success) {
                window.alert(response.msg);
            }
            if (response.success) {
                var post = response.post;
                var html = `<div class="row posts my-1">
                    <div class="col-12 col-md-6 col-lg-5 py-2 post mb-2">
                        <div class="post-header user-info row">
                            <div class="col-9 col-md-8">`;
                if (post.owner.image && post.owner.image.includes("http")) {
                    html += `<img src="${post.owner.image}" alt="${post.owner.fullname}" class="mb-2 rounded">`;
                } else {
                    html += `<img src="../images/profile/${post.owner.image}" alt="${post.owner.fullname}" class="mb-2 rounded">`
                }

                html += `<span class="ml-2" style="color:rgba(0,0,0,0.5)">${post.owner.fullname}</span>
               
                      </div>`;
                html += ` <div class="col-3 col-md-4 py-2 mod-center">`;
                html += `<span class="time" style="font-weight:100;">${post.todate}</span> </div>
                    </div>
                    <div class="post-body mt-2">
                      <a href="/post/${post._id}" style="display:block;">
                        <img src="${post.image}" alt="" class="image-fluid">
                      </a>
                      
                        <p class="lead mt-2">${post.body}</p>
                        
                    </div>
                    
                    <div class="post-footer py-2 px-2">
                        <div class="row">
                            <div class="col-8">
                              <button class="like bg-btn fa fa-thumbs-up" data-post="${post._id}"></button>
                              <span class="countLikes">${post.likes.length}</span>
                             <button class="comments fa fa-comment bg-btn ml-2"></button>
                              <span class="countComments">${post.comments.length}</span>
                            </div>
                            <!--
                            <div class="col-2 ml-auto" style="text-align:center;">
                              <button class="btn-set bg-btn" data-post="${post._id}" data-toggle="modal" data-target="#postModal"><i class="fa fa-ellipsis-v"></i></button>
                            </div>
                            -->
                        </div>
                        <!-- comment section  -->
                        <div class="row mt-3">
                          <div class="comment-list my-2">

                          </div>
                          <form id="comment-form" class="mt-2">
                            <input type="text" name="" class="form-control" placeholder="Add a comment...">
                            <button class="btn-comment fa fa-check" data-post="${post._id}"></button>
                          </form>
                        </div>
                    </div>
                </div>
        </div>`;

                document.querySelector('#postsParent').innerHTML = html + document.querySelector('#postsParent').innerHTML;
            }
            postForm.reset();
            progressBar.style.width = '0';
            progressBar.textContent = "";
        },
        xhr: function () {
            let xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function (e) {
                if (imgDialog.files[0]) {
                    if (!validateFile()) {
                        return;
                    }
                } else {
                    return;
                }
                if (e.lengthComputable) {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    progressBar.style.width = `${percent}%`;
                    progressBar.textContent = `${percent}%`;
                }
            }, false);
            return xhr;
        }
    });
//}
//setInterval(savePost,2000);
}


// assigning events

if(signup) signup.addEventListener('submit',register_user);
if(referral) referral.addEventListener('submit',send_referrallink);
if(validatereferral) validatereferral.addEventListener('submit',validate_referral);
if(resetToken) resetToken.addEventListener('submit',send_Token);
if(cameraBtn) imgDialog.addEventListener('change', updatePhoto);
if(filterBtn){
    console.log("In filter resources");
filterBtn.addEventListener('click', filterResources);
}

if(searchBtn) {
    searchBtn.addEventListener('keyup', findUser);
    searchBtn.addEventListener('click',() => {
        document.querySelector('.sub-search').style.display = 'block';
    });
}


function triggerFollow(e){

    if(e.target.id == 'follow') {
        e.preventDefault();
        add_follow(e);
    }

    if(e.target.id == 'unfollow') {
        e.preventDefault();
        delete_follow(e);
    }

}


function hitLike(element){

    let id = element.target.dataset.post;
    let sound = document.querySelector("#thumbs-up");


    element.target.style.transition = "100ms cubic-bezier(0.42, 0.13, 0.47, 1.16)";

    $.ajax({
        url: '/toggleLike',
        type: 'post',
        data : {id : id},
        dataType : 'json',
        success : function(response){

            if(!response.success){
                window.alert("Something went thgetre wrong");
                return;
            }

            let countLikes = element.target.parentElement.querySelector('.countLikes');
            console.log("countLikes:"+countLikes);

            // play sound
            sound.currentTime = 0;
            sound.play();

            if(response.like) {
                countLikes.textContent = parseInt(countLikes.textContent) + 1
                element.target.style.transform = "scale(1.2)";
                element.target.style.color = "#0275d8";
            }

            if(!response.like) {
                countLikes.textContent = parseInt(countLikes.textContent) - 1;
                element.target.style.transform = "scale(1.2)";
                element.target.style.color = "#222";

            }
            setTimeout(() => {
                element.target.style.transform = "scale(1)";
            },150);

        },
        error:function(){
            console.log("Error here");
            window.alert("Something went ghgtyty wrong");
            return;
        }
    });

}

function saveComment(element){

    let text = element.target.parentElement.querySelector('input');
    let id = element.target.dataset.post;

    $.ajax({
        url: '/saveComment',
        type: 'post',
        data : {id : id,text:text.value.trim()},
        dataType : 'json',
        success : function(response){

            if(!response.success){
                if(response.msg){
                    window.alert(response.msg);
                }else{
                    window.alert("Something went wrong 123.");
                }
                return;
            }

            //generate content
            let commentList = text.parentElement.parentElement.querySelector('.comment-list');

            if(!singlePost){
                commentList.innerHTML =  `<div class="comment my-2"><a href="/profile/${response._id}" class="mr-2">${response.fullname}</a> ${text.value.trim()}</div>
                                          <a href="/post/${id}" class="seperate ml-2">View all comments</a>
                                        `;
            }else{
                commentList.innerHTML =  commentList.innerHTML + `<div class="comment my-2"><a href="/profile/${response._id}" class="mr-2">${response.fullname}</a> ${text.value.trim()}</div>`;
            }

            //make input empty
            text.value = "";

        },

        error:function(){
            window.alert("Something went wrong 567");
            return;
        }

    });

}


if(subSearch) subSearch.addEventListener('click', e => triggerFollow(e));
if(flwParent)  flwParent.addEventListener('click',e => triggerFollow(e));


// post form

if(postForm) postForm.addEventListener('submit', savePost);
if(resourceForm) resourceForm.addEventListener('submit',upload_resource);

function trigger(e){
    //target like
    if(e.target.classList.contains('fa-thumbs-up')) hitLike(e);
    // target comment
    if(e.target.classList.contains('btn-comment')) {
        e.preventDefault();
        saveComment(e);
    }
}


//home post
if(posts) posts.addEventListener('click', (e) => {

    trigger(e);

});

//single post
if(singlePost) singlePost.addEventListener('click', (e) => {

    trigger(e);

});


//chat system

if(sendBtn){
    sendBtn.addEventListener('click',function(){

        let text  = document.querySelector('[name="textMsg"]');


        $.ajax({
            url:'/send',
            method: 'POST',
            data : {message:text.value.trim(),receiver:this.dataset.receiver,sender:this.dataset.sender},
            dataType: 'json',
            success:function(response){
                if(!response.success) window.alert(response.msg);
                console.log(response);
                if(response.success){
                    text.value = "";
                    var html = `<span class="chatMsg outgoing">${response.data.message}</span>`;
                    document.querySelector('#textArea').innerHTML = document.querySelector('#textArea').innerHTML + html;
                }
            }
        });

    });
}

//chat box user list


if(users){

    users.forEach(user => user.addEventListener('click', function(e) {

        let imageSrc = this.firstElementChild.currentSrc;
        let name = this.lastElementChild.innerText;
        let receiver = this.dataset.receiver;
        let sender = this.dataset.sender;
        let countMessages = document.querySelectorAll('#chatForm span');
        let textArea =


            document.querySelector('.btn-send').setAttribute('data-receiver', receiver);
        swipeChat.nextElementSibling.setAttribute('src', imageSrc);
        swipeChat.parentElement.querySelector('b').innerText = name;

        setInterval(getMessage,5000);
        //retreive user chat
        function getMessage(){
            $.ajax({
                url: '/getMessage',
                method: 'POST',
                data: {receiver: receiver, sender: sender},
                dataType: 'json',
                success: function (response) {
                    let oldMessages = document.querySelectorAll('#textArea .incoming');
                    console.log("old messages" + oldMessages);
                    let messages = response.data;
                    let data = messages.map(message => {
                        let html = `<span class="chatMsg ${sender != message.sender ? 'incoming' : 'outgoing' }">${message.message}</span>`;
                        return html;
                    }).join(" ");
                    document.querySelector('#textArea').innerHTML = data;
                    let newMessages = document.querySelectorAll('#textArea .incoming');
                    console.log(`OLD ${oldMessages.length} NEW ${newMessages.length}`);
                    if (oldMessages.length > 0) {
                        if (newMessages.length > oldMessages.length) {
                            console.log(`RING- ${newMessages.length} ${oldMessages.length}`);
                            document.querySelector('#msg-new').play();
                            document.querySelector('#chatForm').scrollTop = document.querySelector('#chatForm').scrollHeight;
                        }
                    }
                }
            });
        }

    }));


}


//fetch notifications

function getNotification(){

    let parent = document.querySelectorAll('.notification-bar');

    $.ajax({
        url: '/getFeed',
        type: 'GET',
        dataType: 'json',
        success:function(response){

            let countOld;

            let data = response.map(data => {
                let html;
                if(window.innerWidth > 768){

                    countOld = parent[0].querySelectorAll('li').length;

                    html = `<li>
                            <a href="/post/${data.taskID}">`;

                    if(data.taskByImg && data.taskByImg.includes("http")){
                        html +=   `<img src="${data.taskByImg}" class="mb-2 rounded">`;
                    } else {
                        html +=   `<img src="../images/profile/${data.taskByImg}" class="mb-2 rounded">`;
                    }

                    html +=  `<b class="ml-3">${data.taskByName}</b> ${data.taskType == "like"?'liked your post':'commented on your post'}
                                      <img src="../images/posts/${data.taskImg}" style="float:right;">
                                    </a>
                                  </li>`;

                }else{

                    countOld = parent[1].querySelectorAll('li').length;

                    html = `  <li>
                               <a href="/post/${data.taskID}">`;

                    if(data.taskByImg && data.taskByImg.includes("http")){
                        html +=   `<img src="${data.taskByImg}" class="mr-3" style="width:40px;height:40px;">`;
                    } else {
                        html +=   `<img src="../images/profile/${data.taskByImg}" class="mr-3" style="width:40px;height:40px;">`;
                    }


                    html +=       ` <span><b>${data.taskByName}</b> ${data.taskType == "like"?'liked your post':'commented on your post'}</span>
                                       </a>
                                       </li>`;

                }

                return html;

            }).join(" ");



            if(window.innerWidth > 768){
                data = (data == "") ? `<p class="lead">No Notifications</p>`: data;
                parent[0].innerHTML = data;
                let newCount = parent[0].querySelectorAll('li').length;
                if(countOld < newCount){
                    notifBtn[0].style.color = '#2196f3';
                }
            }else{
                data = (data == "") ? `<p class="lead">No Notifications</p>`:data;
                parent[1].innerHTML = data;
                let newCount = parent[1].querySelectorAll('li').length;
                if(countOld < newCount){
                    notifBtn[1].style.color = '#2196f3';
                }
            }

        }
    });

}


if(notifBtn.length > 0){

    notifBtn.forEach(button => button.addEventListener('click',function(){
        this.style.color = "#222";
        getNotification();
    }));

    setInterval(getNotification,10000);

}

