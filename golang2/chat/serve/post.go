package serve

import (
	"ChatServe/data"
	"ChatServe/utils"
	"encoding/json"
	"net/http"
	"strconv"
)

// ListPost 列出某一主贴的所有回帖
func ListPost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	str1 := r.FormValue("topicID")
	str2 := r.FormValue("userID")
	topicID, err := strconv.Atoi(str1)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	userID, err := strconv.Atoi(str2)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	thread, err := data.ThreadByTopicID(topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	posts, err := data.GetPost(topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	collection, err := data.IsCollected(userID, topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	threadAndPost := make(map[string]interface{})
	threadAndPost["thread"] = thread
	threadAndPost["post"] = posts
	threadAndPost["collection"] = collection

	data, err := json.Marshal(threadAndPost)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	w.Write(data)
}

// CreatePost 新建一个新的回帖
func CreatePost(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	str1 := r.FormValue("userID")
	str2 := r.FormValue("topicID")
	text := r.FormValue("text")
	str4 := r.FormValue("floor")
	userID, err := strconv.Atoi(str1)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	topicID, err := strconv.Atoi(str2)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	floor, err := strconv.Atoi(str4)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	err = data.CreatePost(userID, topicID, text, floor)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	err = data.AddRepNum(topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
}

// Collect 收藏主贴
func Collect(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	str1 := r.FormValue("userID")
	str2 := r.FormValue("topicID")
	userID, err := strconv.Atoi(str1)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	topicID, err := strconv.Atoi(str2)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	collectionid, err := data.Collect(userID, topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	data, err := json.Marshal(collectionid)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	w.Write(data)
}

// Cancel 取消收藏
func Cancel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	str1 := r.FormValue("userID")
	str2 := r.FormValue("topicID")
	userID, err := strconv.Atoi(str1)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	topicID, err := strconv.Atoi(str2)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	collectionid, err := data.Cancel(userID, topicID)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	data, err := json.Marshal(collectionid)
	if err != nil {
		utils.Logger.SetPrefix("ERROR ")
		utils.Logger.Println(err)
		return
	}
	w.Write(data)
}
