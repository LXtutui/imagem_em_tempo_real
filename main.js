var canvas;
var video;
var classifier;
var resultado = "";
var api_fala;
var dado_fala;
var fala;

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}
function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
function modelLoaded(){
  console.log("modelo carregado");
}
function gotResult(error, results){
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence>0.5)&&(resultado!=results[0].label)){
      console.log(results);
      resultado=results[0].label;
      api_fala = window.speechSynthesis;
      dado_fala = "objeto detectado é : " + resultado;
      fala = new SpeechSynthesisUtterance(dado_fala);
      api_fala.speak(fala);
      document.getElementById("result_object_name").innerHTML=resultado;
      document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}