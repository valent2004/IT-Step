var modal = document.getElementById("createObj");

var edit = document.getElementById("editObj");

var btn = document.getElementById("Add");

var adding = document.getElementById("Confirm");

var search = document.getElementById("name");

var to_search = document.getElementById("ToSearch");

var parametr = document.getElementById("Edit");

var span = document.getElementsByClassName("times")[0];

var span_2 = document.getElementsByClassName("times_2")[0];

var upload = document.getElementById("photo");

var uploads = document.getElementById("photos");

var sort = document.getElementById("sort");

var size = document.getElementById("size");

var imgs = document.getElementById("images");

var img = document.getElementById("image");

var del = document.getElementById("delete");

var restart = document.getElementById("Restart");

let index = 0;

sort.value = "none";

search.value = "";

const purpose_types = document.createElement("select");
purpose_types.classList.add("listPurpose");
purpose_types.style.float = "right";
purpose_types.style.width = "100px";
const purpose_type_1 = document.createElement("option");
    purpose_type_1.setAttribute("value", "PC");
    purpose_type_1.innerText = "PC";
    const purpose_type_2 = document.createElement("option");
    purpose_type_2.setAttribute("value", "Laptop");
    purpose_type_2.innerText = "Laptop";
    purpose_types.appendChild(purpose_type_1);
    purpose_types.appendChild(purpose_type_2);

const type_types = document.createElement("select");
type_types.classList.add("listType");
type_types.style.float = "right";
type_types.style.width = "100px";
const type_type_1 = document.createElement("option");
    type_type_1.setAttribute("value", "DDR1");
    type_type_1.innerText = "DDR1";
    const type_type_2 = document.createElement("option");
    type_type_2.setAttribute("value", "DDR2");
    type_type_2.innerText = "DDR2";
    const type_type_3 = document.createElement("option");
    type_type_3.setAttribute("value", "DDR3");
    type_type_3.innerText = "DDR3";
    const type_type_4 = document.createElement("option");
    type_type_4.setAttribute("value", "DDR4");
    type_type_4.innerText = "DDR4";
    const type_type_5 = document.createElement("option");
    type_type_5.setAttribute("value", "DDR5");
    type_type_5.innerText = "DDR5";
    type_types.appendChild(type_type_1);
    type_types.appendChild(type_type_2);
    type_types.appendChild(type_type_3);
    type_types.appendChild(type_type_4);
    type_types.appendChild(type_type_5);

function TakeFromLocal()
{
  let local = new Array;
  if(localStorage.length != 0)
  {
    for(let i = 0; i < localStorage.length; i++)
  {
    local[i] = JSON.parse(localStorage.getItem('element' + index));
    index++;
  }
  }
  return local;
}

var local = TakeFromLocal();

var c, vv, bb, cur_img;

let photo;

function AddElement(local)
{
  for(let i = 0; i < local.length; i++)
  {
    const newEl = document.createElement("div");
    newEl.classList.add("element");
    newEl.setAttribute("id", local[i].call);
    newEl.innerHTML = `
         <center><img src=images/${local[i].cur_photo} height=100px width=200px id=photos${i}></center>
         <p class=call id=n${i}> 
         ${local[i].call}
         </p>
         <p class=purpose id=p${i}> 
         Призначення: ${local[i].purpose}
         </p>
         <p class=type id=t${i}> 
         Тип: ${local[i].type}
         </p>
         <p class=volume id=v${i}> 
         Об’єм: ${local[i].volume} ГБ
         </p>
         <p class=bar id=b${i}> 
         Кількість планок: ${local[i].bar}
         </p>
         <center><button class=Edit onclick=EditElement(n${i},p${i},t${i},v${i},b${i},photos${i})>
         Edit
         </button>
         <button class=Delete onclick=DeleteElement(${local[i].call})>
         Delete
         </button></center>
     `;
     document.body.appendChild(newEl);
  }
}

AddElement(local);

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  document.getElementById("names").value = '';
  document.getElementById("volume").value = '';
  document.getElementById("bars").value = '';
  modal.style.display = "none";
}

span_2.onclick = function() {
  edit.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function EditElement(n, p, t, v, b, photos){
  edit.style.display = "block";
  document.getElementById("namimg").value = n.textContent.replace(/ |\n/g, '');
  photo = photos.src;
  document.getElementById("random_imgs").setAttribute("src", `${photos.src}`);
  document.getElementById("purposimg").value = p.textContent.replace(/Призначення:| |\n/g, '');
  document.getElementById("typimg").value = t.textContent.replace(/Тип:| |\n/g, '');
  document.getElementById("volumimg").value = v.textContent.replace(/Об’єм:|ГБ| |\n/g, '');
  document.getElementById("barimg").value = b.textContent.replace(/Кількість|планок:| |\n/g, '');
  parametr.onclick = function EditElement()
  {
    if(document.getElementById("namimg").value.trim() == "") {alert("One of the input field is empty");}
    else if(isNaN(document.getElementById("volumimg").value) || isNaN(document.getElementById("barimg").value)){alert("One of the input field is not a number(A volume or a bars)");}
    else if(document.getElementById("images").childNodes.length == 0){alert("You have no photo");}
    else
    {
      let call = document.getElementById("namimg").value.toString();
      let purpose = document.getElementById("purposimg").value;
      let type = document.getElementById("typimg").value;
      let volume = document.getElementById("volumimg").value.toString();
      let bar = document.getElementById("barimg").value.toString();
      for(let i = 0; i < local.length; i++)
      {
        if(n.textContent.replace(/ |\n/g, '') == local[i].call)
        {
          local[i].call = call;
          local[i].purpose = purpose;
          local[i].type= type;
          local[i].volume = volume;
          local[i].bar = bar;
          let j = 0;
          while(j < 30)
          {
            photo = photo.replace(photo[0], '');
            j++
          }
          local[i].cur_photo = photo;
          localStorage.setItem("element" + i, JSON.stringify(local[i]));
        }
      }
      n.innerHTML = call;
      p.innerHTML = "Призначення: " + purpose;
      t.innerHTML = "Тип: " + type;
      v.innerHTML = "Об’єм: " + volume + " ГБ";
      b.innerHTML = "Кількість планок: " + bar;
      photos.src = "~/images/" + photo;
      edit.style.display = "none";
    }
  } 
}

function DeleteElement(newEl){
  let beginning = 0, j = 0, nazva = 0;
  for(let i = 0; i < local.length; i++)
  {
    if(newEl.id == local[i].call)
    {
      newEl.remove();
      local.splice(i, 1);
      j = i;
      while(j < localStorage.length)
      {
        localStorage.removeItem("element" + (j + nazva));
        nazva++;
      }
      beginning = i;
      break;
    }
  }
  for(let i = beginning; i < local.length; i++)
  {
    localStorage.setItem("element" + i, JSON.stringify(local[i]));
  }
  index = local.length;
}

function CreateElement(){
  if(document.getElementById("names").value.trim() == "") {alert("One of the input field is empty");}
  else if(isNaN(document.getElementById("volume").value) || isNaN(document.getElementById("bars").value)){alert("One of the input field is not a number(A volume or a bars)");}
  else if(document.getElementById("image").childNodes.length == 0){alert("You have no photo");}
  else
  {
    var theSameCall = false;
    for(let i = 0; i < local.length; i++)
    {
      if(document.getElementById("names").value.toString() == local[i].call)
      {
        theSameCall = true;
        break;
      }
    }
    if(theSameCall){alert("We have the same name");}
    else
    {
    let call = document.getElementById("names").value.toString();
    c = call;
    let volume = document.getElementById("volume").value.toString();
    vv = volume;
    let bar = document.getElementById("bars").value.toString();
    bb = bar;
    let filename = upload.value.replace(/C:\\fakepath\\/, '');
    const authData = {
      call: c,
      purpose: document.getElementById("purposes").value,
      type: document.getElementById("types").value,
      volume: vv,
      bar: bb,
      cur_photo: filename
    };

    localStorage.setItem("element" + index, JSON.stringify(authData));

    const Data = JSON.parse(localStorage.getItem("element" + index));

    local[index] = JSON.parse(localStorage.getItem('element' + index));

    console.log(Data);

    const newEl = document.createElement("div");
    newEl.classList.add("element");
    newEl.setAttribute("id", local[index].call);
    newEl.innerHTML = `
         <center><img src=images/${filename} height=100px width=200px id=photos${index}></center>
         <p class=call id=n${index}> 
         ${Data.call}
         </p>
         <p class=purpose id=p${index}> 
         Призначення: ${Data.purpose}
         </p>
         <p class=type id=t${index}> 
         Тип: ${Data.type}
         </p>
         <p class=volume id=v${index}> 
         Об’єм: ${Data.volume} ГБ
         </p>
         <p class=bar id=b${index}> 
         Кількість планок: ${Data.bar}
         </p>
         <center><button class=Edit onclick=EditElement(n${index},p${index},t${index},v${index},b${index},photos${index})>
         Edit
         </button>
         <button class=Delete onclick=DeleteElement(${Data.call})>
         Delete
         </button></center>
     `;
    modal.style.display = "none";
    document.getElementById("names").value = "";
    document.getElementById("purposes").value = "PC";
    document.getElementById("types").value = "DDR5";
    document.getElementById("volume").value = "";
    document.getElementById("bars").value = "";
    document.getElementById("random_img").setAttribute("src", ``);
    document.body.appendChild(newEl);
    index++;
    }
  }
}
 
upload.addEventListener('change', uploadImageDisplay);

uploads.addEventListener('change', function uploadImageDisplays()
{
  let filename = uploads.value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("random_imgs").setAttribute("src", `~/images/${filename}`)
    imgs.setAttribute("style", "display: block");
    photo = document.getElementById("random_imgs").src;
});

function uploadImageDisplay() {
  let filename = upload.value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("random_img").setAttribute("src", `images/${filename}`)
    img.setAttribute("style", "display: block");
    photo = document.getElementById("random_img").src;    
}

function Reset()
{
  var sort_array = local;
  switch(size.value)
  {
    case "Bigger":
      if(sort.value == "models")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      for(let j = i + 1; j < sort_array.length; j++)
      {
        if(sort_array[i].call[0] >= sort_array[j].call[0])
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "pur")
  {
    var purpose_local = new Array, iii = 0;
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    document.body.appendChild(purpose_types);
    if(purpose_types.value=="PC")
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "PC")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
      else
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "Laptop")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
    purpose_types.addEventListener('change', function()
    {
      sort_array = local;
      var purpose_local = new Array, iii = 0;
      document.querySelectorAll(".element").forEach((element) => {
        element.remove();
      });
      if(purpose_types.value=="PC")
      {
        for(let i = 0; i < sort_array.length ; i++)
        {
          if(sort_array[i].purpose == "PC")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
      else
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "Laptop")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
    });
  }
  if(sort.value == "typ")
  {
    var purpose_local = new Array, iii = 0;
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.body.appendChild(type_types);
    switch(type_types.value)
    {
      case "DDR1":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR1")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR2":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR2")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR3":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR3")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR4":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR4")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR5":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR5")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
    }
    type_types.addEventListener('change', function()
    {
      sort_array = local;
      var purpose_local = new Array, iii = 0;
      document.querySelectorAll(".element").forEach((element) => {
        element.remove();
      });
      switch(type_types.value)
    {
      case "DDR1":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR1")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR2":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR2")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR3":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR3")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR4":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR4")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR5":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR5")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
    }
    });
  }
  if(sort.value == "vol")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      let cur = parseInt(sort_array[i].volume);
      for(let j = i + 1; j < sort_array.length; j++)
      {
        let anoth = parseInt(sort_array[j].volume);
        if(cur >= anoth)
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "bar")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      let cur = parseInt(sort_array[i].bar);
      for(let j = i + 1; j < sort_array.length; j++)
      {
        let anoth = parseInt(sort_array[j].bar);
        if(cur >= anoth)
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "none")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    AddElement(local);
  }
  break;
  case "Lower":
    if(sort.value == "models")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      for(let j = i + 1; j < sort_array.length; j++)
      {
        if(sort_array[i].call[0] <= sort_array[j].call[0])
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "pur")
  {
    var purpose_local = new Array, iii = 0;
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    document.body.appendChild(purpose_types);
    if(purpose_types.value=="PC")
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "PC")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
      else
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "Laptop")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
    purpose_types.addEventListener('change', function()
    {
      sort_array = local;
      var purpose_local = new Array, iii = 0;
      document.querySelectorAll(".element").forEach((element) => {
        element.remove();
      });
      if(purpose_types.value=="PC")
      {
        for(let i = 0; i < sort_array.length ; i++)
        {
          if(sort_array[i].purpose == "PC")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
      else
      {
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].purpose == "Laptop")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
      }
    });
  }
  if(sort.value == "typ")
  {
    var purpose_local = new Array, iii = 0;
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.body.appendChild(type_types);
    switch(type_types.value)
    {
      case "DDR1":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR1")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR2":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR2")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR3":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR3")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR4":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR4")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR5":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR5")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
    }
    type_types.addEventListener('change', function()
    {
      sort_array = local;
      var purpose_local = new Array, iii = 0;
      document.querySelectorAll(".element").forEach((element) => {
        element.remove();
      });
      switch(type_types.value)
    {
      case "DDR1":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR1")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR2":
        for(let i = 0; i < sort_array.length; i++)
        {
          if(sort_array[i].type == "DDR2")
          {
            purpose_local[iii] = sort_array[i];
            iii++;
          }
        }
        AddElement(purpose_local);
        break;
      case "DDR3":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR3")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR4":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR4")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
      case "DDR5":
          for(let i = 0; i < sort_array.length; i++)
          {
            if(sort_array[i].type == "DDR5")
            {
              purpose_local[iii] = sort_array[i];
              iii++;
            }
          }
          AddElement(purpose_local);
          break;
    }
    });
  }
  if(sort.value == "vol")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      let cur = parseInt(sort_array[i].volume);
      for(let j = i + 1; j < sort_array.length; j++)
      {
        let anoth = parseInt(sort_array[j].volume);
        if(cur <= anoth)
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "bar")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listPurpose").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll(".listType").forEach((element) => {
      element.remove();
    });
    for(let i = 0; i < sort_array.length - 1; i++)
    {
      let cur = parseInt(sort_array[i].bar);
      for(let j = i + 1; j < sort_array.length; j++)
      {
        let anoth = parseInt(sort_array[j].bar);
        if(cur <= anoth)
        {
          let temp = sort_array[i];
          sort_array[i] = sort_array[j];
          sort_array[j] = temp;
        }
      }
    }
    AddElement(sort_array);
  }
  if(sort.value == "none")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();
    });
    AddElement(local);
  }
  break;
  }
}

sort.addEventListener('change', Reset, true);
size.addEventListener('change', Reset, true);

function SearchElement()
{
  if(search.value != "")
  {
    document.querySelectorAll(".element").forEach((element) => {
      element.remove();});
    for(let i = 0; i < local.length; i++)
    {
      if(search.value == local[i].call)
      {
        const newEl = document.createElement("div");
      newEl.classList.add("element");
      newEl.setAttribute("id", local[i].call);
      newEl.innerHTML = `
           <center><img src=~/images/${local[i].cur_photo} height=100px width=200px id=photos></center>
           <p class=call id=n> 
           ${local[i].call}
           </p>
           <p class=purpose id=p> 
           Призначення: ${local[i].purpose}
           </p>
           <p class=type id=t> 
           Тип: ${local[i].type}
           </p>
           <p class=volume id=v> 
           Об’єм: ${local[i].volume} ГБ
           </p>
           <p class=bar id=b> 
           Кількість планок: ${local[i].bar}
           </p>
           <center><button class=Edit onclick=EditElement(n,p,t,v,b)>
           Edit
           </button>
           <button class=Delete onclick=DeleteElement(${local[i].call})>
           Delete
           </button></center>
       `;
       document.body.appendChild(newEl);
      }
    }
  }
  else{alert("Enter something in bar of search");}
}

restart.onclick = function()
{
  window.location.reload();
}