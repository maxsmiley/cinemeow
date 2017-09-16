//Backend code for server / database
var projects = [];
var maxClipsStackSize = 10;

var project_id_itter = 0; //Should be updated by a file?
var source_video_id_itter = 0; // Should be updated by a file?

//Project Data Structure
var project_ex = new Object();
project_ex.clips_stack = []; //time signature collections
project_ex.clips_redo_stack = [];
project_ex.project_id = "some id";
project_ex.video_clips = []; //actual videos

function createNewProject(){
	var newProject = new Object();
	newProject.clips_stack = [];
	newProject.clips_redo_stack = [];
	newProject.video_clips = [];
	newProject.project_id = project_id_itter;
	project_id_itter ++;
	projects.unshift(newProject);
}

function addSourceVideoToProject(project_id, videoClip){
	projects[project_id].video_clips.push({
		"video": videoClip, 
		"video_id" :source_video_id_itter,
		"video_url" : "SOME URL LELELELE"});
	source_video_id_itter ++;	
	//Return id back to client? 
	//Or manage ids another way
}

var clips_stack = [];
var clips_redo_stack = [];
//Add clips to project clips stack
function updateStack(clips_data){
	//var clips_data = JSON.parse(clips_data_JSON);
	console.log("DATA RECEIVED " + clips_data);
	//var clone = jQuery.extend(true, {}, clips_data);
	
	//var clone = {};
	//jQuery.extend(clone,clips_data);

	clips_stack.unshift(clone(clips_data));

	console.log("DATA");
	console.log(JSON.stringify(clips_data));
	/*if(clips_stack.length > maxClipsStackSize){
		clips_stack.pop();
	}*/
	clips_redo_stack = [];
	updateUndoRedoButtons();
}

//Undo last modifications to clips in project
function undo(project){
	console.log("ON TOP OF CLIPS STACK: " + clips_stack[1]);
	project["clips"] = clone(clips_stack[1]);
	clips_redo_stack.unshift(clips_stack.shift());
	if(clips_redo_stack.length > maxClipsStackSize){
		clips_redo_stack.pop();
	}
	populateTimelineWithCurrentClips();
	updateUndoRedoButtons();
	saveClips(false, "undo");
}

//Redo last modification to clips in project
function redo(project){
	clips_stack.unshift(clips_redo_stack.shift());
	project["clips"] = clone(clips_stack[0]);
	if(clips_stack.length > maxClipsStackSize){
		clips_stack.pop();
	}
	populateTimelineWithCurrentClips();
	updateUndoRedoButtons();
	saveClips(false, "redo");
}



//Return current clips object in given project
function getCurrentClips(project_id){
	return projects[project_id].clips_stack[0];
}

function getProjectFromServer (){
	var id = "528a6b61e8f3c650ef000001"; //Id of project?
	$.ajax({
	        type: "GET",
	        url: "http://http://cinemeow.herokuapp.com/project",
	        data: "id=" + id,
	        success: function (msg) {
	                console.log("Success " + msg);
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	        	 console.log("failure " + textStatus + " : "+ errorThrown);
	        }
	});
}

function test(){
	console.log("Testing server protocols:");
	getProjectFromServer();
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

