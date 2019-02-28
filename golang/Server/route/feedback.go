package route

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"../psql"

	_ "github.com/lib/pq"
)

func Addfeedback(w http.ResponseWriter, r *http.Request) {

	Cors(w)
	r.ParseForm()
	if r.Method == "POST" {

		result, err := ioutil.ReadAll(r.Body)
		CheckErr(err)
		var user map[string]interface{}
		json.Unmarshal(result, &user)

		tuserid := user["userid"]
		tfeedbacktype := user["feedbacktype"]
		tfeedbackcontent := user["feedbackcontent"]
		//fmt.Println(tuserid)
		//fmt.Println(tfeedbacktype)
		//fmt.Println(tfeedbackcontent)
		psql.Addfeedback(tuserid.(string), tfeedbacktype.(string), tfeedbackcontent.(string))
		//fmt.Println("insert into feedback success")

	}

}

func Userfeedback(w http.ResponseWriter, r *http.Request) {

	Cors(w)
	r.ParseForm() //解析参数，默认是不会解析的
	if r.Method == "POST" {
		//fmt.Println("123")
		result, err := ioutil.ReadAll(r.Body)
		CheckErr(err)
		var user map[string]interface{}
		json.Unmarshal(result, &user)
		tuserid := user["userid"]
		//fmt.Println(tuserid)
		var Feedbacklist []psql.Feedback
		Feedbacklist = psql.Userfeedback(tuserid.(string))
		res, _ := json.Marshal(Feedbacklist)

		w.Write(res)

	}

}