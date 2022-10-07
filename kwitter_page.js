//YOUR FIRE BASE LINKS

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB7KGxy-ybIf76Vtc0S3EBkDNOHtQFwKyc",
    authDomain: "c97class.firebaseapp.com",
    databaseURL: "https://c97class-default-rtdb.firebaseio.com",
    projectId: "c97class",
    storageBucket: "c97class.appspot.com",
    messagingSenderId: "252294454593",
    appId: "1:252294454593:web:0f8fd4ceeeca0d48b515c0"
  };
  
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });
  
  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
                
          
        name = message_data["name"]
        message = message_data["message"]
        like = message_data["like"]

        namedisplay = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'>"
        messagedisplay = "<h4 class = 'message_h4'>" + message + "</h4>"
        likedisplay1 = "<button class = 'btn btn-warning' id= '"+ firebase_message_id + "' value =" + like + "onclick = 'update(this.id)'>"  
        likedisplay2 = "<span class = 'glyphicon glyphicon-thumbs-up'> like :" + like +"</span> </button> <hr>"
        
        row = namedisplay + messagedisplay + likedisplay1 + likedisplay2;
        document.getElementById("output").innerHTML += row;
    
      }
    
      });
  });
}
getData();

function updatelike(message_id)
{ 
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updatelikes = Number(likes) + 1;
  firebase.database().ref(room_name).child(message_id).update({
    like : updatelikes
  });


function llogout()   {
   localStorage.removeItem("username")
   localStorage.removeItem("roomname")
   window.location("index.html")
}





}