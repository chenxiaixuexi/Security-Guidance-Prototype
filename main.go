package main

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"path"
	"sort"

	"github.com/antchfx/xmlquery"
	"github.com/gin-gonic/gin"
	"github.com/northbright/pathhelper"

	// "net/http"
	"strconv"

	"github.com/shopspring/decimal"
)

type passwordPolicy struct {
	password_complex    int64
	requireAlphanumeric bool
	password_length     int64
	forcePIN            bool
	allowSimple         bool
	failed_attempt      int64
	maxPINAgeInDay      int64
}
type company struct {
	people int
	salary int
	auth   float32
	enc    float32
}
type von struct {
	overall   float32
	mobile    float32
	PC        float32
	errorrate float32
}
type greene struct {
	overall   float32
	mobile    float32
	PC        float32
	complex   float32
	errorrate float32
}
type WMelicher struct {
	overall     float32
	attempts    float32
	create      float32
	creAttempts float32
}

type shay struct {
	overall    float32
	createAtt  float32
	entryAtt   float32
	recallrate float32
	security   string
}

type TransCompare struct {
	money         int64
	securityLevel int64
	Entryattempts int64
	charclass     int64
	errors        int64
	wipeNum       int64
	seconds       int64
	expire        int64
	NumOfChar     int64
	length        int64
}

func Readfile(name string) map[string]string {
	dict := map[string]string{}

	f, err := os.Open(name)
	if err != nil {
		fmt.Println("cannot open file")
	}
	doc, err := xmlquery.Parse(f)

	if node := xmlquery.FindOne(doc, "//dict[string='Passcode']"); node == nil {
		log.Fatal("not found")
	} else {
		fmt.Println(node.FirstChild.NextSibling.Data)
		newNode := xmlquery.CreateXPathNavigator(node)
		newNode.MoveToChild()
		newNode.MoveToNext()
		fmt.Println(newNode.LocalName())
		fmt.Println(newNode.Value())

		var key string
		for newNode.Current().Type == 2 {
			key = newNode.Value()
			newNode.MoveToNext()
			fmt.Println(key)
			fmt.Println(newNode.Current().Type)
			if newNode.LocalName() == "true" {
				dict[key] = "true"
			} else {
				dict[key] = newNode.Value()
			}
			newNode.MoveToNext()
		}
		fmt.Println(dict)
	}
	return dict
}
func definePaawordPolicy(dict map[string]string) *passwordPolicy {
	policy := &passwordPolicy{}
	// more non-alphanumeric characters, more complicated
	if ptype, ok := dict["minComplexChars"]; ok {
		switch ptype {
		case "1":
			policy.password_complex = 1
		case "2":
			policy.password_complex = 2
		case "3":
			policy.password_complex = 3
		case "4":
			policy.password_complex = 4
		}
	} else {
		policy.password_complex = 0
	}
	// requireAlphanumeric， means that like internet type/ 2class
	alnumeric := dict["requireAlphanumeric"]
	switch alnumeric {
	case "true":
		policy.requireAlphanumeric = true
	case "false":
		policy.requireAlphanumeric = false
	}
	//allow simple, 可能会降低时间.
	simple := dict["allowSimple"]
	switch simple {
	case "true":
		policy.allowSimple = true
	case "false":
		policy.allowSimple = false
	}

	// length
	if len, ok := dict["minLength"]; ok {
		policy.password_length, _ = strconv.ParseInt(len, 10, 64)
	} else {
		policy.password_length = 0
	}

	// Allow PIN， extra authentication time
	pin := dict["forcePIN"]
	switch pin {
	case "true":
		policy.forcePIN = true
	case "false":
		policy.forcePIN = false
	}
	//failed attempt means that it could increase the number of creation and password recovery
	if failedattempt, ok := dict["maxFailedAttempts"]; ok {
		policy.failed_attempt, _ = strconv.ParseInt(failedattempt, 10, 64)
	} else {
		policy.failed_attempt = -1
	}
	//maxPINAgeInDay, expire
	if age, ok := dict["maxPINAgeInDays"]; ok {
		policy.maxPINAgeInDay, _ = strconv.ParseInt(age, 10, 64)
	} else {
		policy.maxPINAgeInDay = -1
	}

	return policy
}

//Von Zezschwitz et al.
func estimateTime(policy *passwordPolicy) *von {
	fmt.Println("number of char:", policy.password_complex)
	fmt.Println(policy.requireAlphanumeric)
	//smartphone speed
	internetspeed := float32(6.5) / float32(12)
	random := float32(13) / float32(12)
	dictinary := float32(3.5) / float32(12)
	//password length
	sec := float32(0)

	if policy.password_complex > 0 && policy.requireAlphanumeric == true {
		sec += random * float32(policy.password_length)
	} else if policy.requireAlphanumeric == true {
		sec += internetspeed * float32(policy.password_length)
	} else {
		sec += dictinary * float32(policy.password_length)
	}
	//input times
	all := float32(365 * 4)
	//error
	overall_error := float32(0.107) / 10.2 * float32(policy.password_length)
	phoneErrorRate := float32(0.158)
	PC := float32(0.087)
	overallTime := all * (1 + overall_error) * sec / float32(3600)
	smartphone := all * (1 + phoneErrorRate) * sec / float32(3600)
	PCtime := all * (1 + PC) * sec / float32(3600)

	return &von{overallTime, smartphone, PCtime, overall_error}
}

//对三篇文献进行差异性分析
//每个参与输入10字符串10次， 165 partcipant。 16500F
func cal(policy *passwordPolicy) *greene {
	mobilespeed := float32(0)
	pcspeed := float32(0)
	overallspeed := float32(0)
	complexchar := float32(0)
	if policy.password_complex > 0 && policy.requireAlphanumeric == true {
		mobilespeed += 1.3 * float32(policy.password_length)
		pcspeed += 1.1 * float32(policy.password_length)
		overallspeed += 1.2 * float32(policy.password_length)
		complexchar += 2.5
	}
	totalerrate := (float32(2100) / 16500) / 12 * float32(policy.password_length)
	all := float32(365 * 4)
	overallTime := all * (1 + totalerrate) * overallspeed / float32(3600)
	smartphone := all * (1 + totalerrate) * mobilespeed / float32(3600)
	PCtime := all * (1 + totalerrate) * pcspeed / float32(3600)
	complextime := all * (1 + totalerrate) * complexchar / float32(3600)
	return &greene{overallTime, smartphone, PCtime, complextime, totalerrate}
}

//新建时间，和新建次数等
func melicher(policy *passwordPolicy) *WMelicher {
	sec := float32(0)
	create := float32(0)
	attempts := float32(0)
	creation_attempt := float32(0)
	if policy.password_complex > 0 && policy.requireAlphanumeric == true {
		sec += 1.35 * float32(policy.password_length)
		create += 1.8 * float32(policy.password_length)
		attempts += 1.75
		creation_attempt += 1.48
	} else if policy.requireAlphanumeric == true {
		sec += 1.1 * float32(policy.password_length)
		create += 1.68 * float32(policy.password_length)
		attempts += 1.66
		creation_attempt += 1.98
	} else {
		sec += 0.9 * float32(policy.password_length)
		create += 1.35 * float32(policy.password_length)
		attempts += 1.8
		creation_attempt += 1.84
	}
	all := float32(365 * 4)
	overallTime := all * (attempts) * sec / float32(3600)

	if policy.maxPINAgeInDay > 0 {
		count := float32(365) / float32(policy.maxPINAgeInDay)
		creTime := count * creation_attempt * create / float32(60)
		return &WMelicher{overallTime, attempts, creTime, creation_attempt}
	}
	return &WMelicher{overallTime, attempts, create, creation_attempt}
}

//shay et al,
//他们测试了recall
// ｜type｜numer｜
// ｜----  | ----  |
// | basic12  | 40-50 |
// | 2word12  | 30-40|
// | 3class12  | 20-30 |

// ｜type｜numer｜
// ｜----  | ----  |
// | basic16  | 20-30 |
// | 2word16  | 10-20 |
// | 3class16  | 0-10 |
func CalShay(policy *passwordPolicy) *shay {
	sec := float32(0)
	//create  attempt
	attempts := float32(0)
	recall_attempt := float32(0)
	security := ""
	if policy.password_complex > 0 && policy.requireAlphanumeric == true {
		sec += 1.1 * float32(policy.password_length)
		attempts += 1.7
		recall_attempt += 1.65 / 12 * float32(policy.password_length)
		if policy.password_length < 12 {
			security += "larger than 30%"
		} else if policy.password_length >= 12 && policy.password_length < 16 {
			security += "range from 20% to 30%"
		} else {
			security += "smaller than 10%"
		}
	} else if policy.requireAlphanumeric == true {
		sec += 0.9 * float32(policy.password_length)
		recall_attempt += 1.65 / 12 * float32(policy.password_length)
		attempts += 2
		if policy.password_length < 12 {
			security += "larger than 40%"
		} else if policy.password_length >= 12 && policy.password_length < 16 {
			security += "range from 30% to 40%"
		} else {
			security += "range from 10% to 20%"
		}
	} else {
		sec += 0.84 * float32(policy.password_length)
		recall_attempt += 1.65 / 12 * float32(policy.password_length)
		attempts += 1.7
		if policy.password_length < 12 {
			security += "larger than 50%"
		} else if policy.password_length >= 12 && policy.password_length < 16 {
			security += "range from 40% to 50%"
		} else {
			security += "range from 20% to 30%"
		}
	}
	all := float32(365 * 4)
	overallTime := all * (recall_attempt) * sec / float32(3600)
	//4.4.6 enter password within five attempts
	recall_password := float32(0.2)

	return &shay{overallTime, attempts, recall_attempt, recall_password, security}
}

func Analyze(A *von, B *greene, C *WMelicher, D *shay, companyInfo *company, policy *passwordPolicy) map[string]any {
	maxEmployees := companyInfo.people / 2
	if companyInfo.people > 10000 {
		maxEmployees = companyInfo.people
	}
	maxsalary := companyInfo.salary
	if companyInfo.salary > 30 {
		maxsalary = 40
	}
	//seconds
	var timelist []float64
	timelist = append(timelist, float64(A.overall), float64(B.overall), float64(C.overall), float64(D.overall))
	Maxtime, Mintime := FindMinMax(timelist)
	average := int(math.Ceil((float64(A.overall) + float64(B.overall) + float64(C.overall) + float64(D.overall)) / 4))
	totalEntry := int(average * maxEmployees)
	totalMaxTime := int(math.Ceil(float64(Maxtime)) * float64(maxEmployees))
	totalMinTime := int(math.Ceil(float64(Mintime)) * float64(maxEmployees))
	mobile := int(math.Ceil(float64(A.mobile-A.PC) + float64(B.mobile-B.PC)))

	//create attempt
	creattempts := int(math.Ceil((float64(C.creAttempts) + float64(D.createAtt)) / 2))
	//crettime := int(math.Ceil(float64(C.create)))
	expireTime := math.Ceil(float64(365 / policy.maxPINAgeInDay))
	totalattempt := maxEmployees * creattempts * int(expireTime)

	//complex
	complexTimeB := int(math.Ceil(float64(B.complex)))
	totalComplex := complexTimeB * maxEmployees
	//PIN
	timeauth := int(math.Ceil(float64(10*365*4) / 3600))
	total := maxEmployees * timeauth
	//security analysis
	charclass := 2
	if policy.password_complex > 0 {
		charclass = 3
	}
	security := D.security
	//auth
	authtotal := int(math.Ceil(float64(companyInfo.auth)*365*4/3600)) * maxEmployees
	//enc
	enctime := int(math.Ceil(float64(companyInfo.enc)*365*4/3600)) * maxEmployees

	//money : entry + PIN + complexchars + encryption + authentication
	moneycost := (totalEntry + total + totalComplex + enctime + authtotal) * maxsalary

	//failed attempt
	errorC := (C.attempts*10 - 10) / (C.attempts * 10)
	errorD := (D.entryAtt*10 - 10) / (D.entryAtt * 10)
	averageError := (A.errorrate + B.errorrate + errorC + errorD) / 4
	attempt := 365 * 4
	wipeTimes := math.Ceil(math.Pow(float64(averageError), float64(policy.failed_attempt)) * float64(attempt))
	esitimateAverage := strconv.FormatFloat(float64(averageError), 'f', 1, 64)
	var errorlist []float64
	errorlist = append(errorlist, float64(A.errorrate), float64(B.errorrate), float64(errorC), float64(errorD))
	MaxError, MinError := FindMinMax(errorlist)
	Maxerror := strconv.FormatFloat(float64(MaxError), 'f', 1, 64)
	Minerror := strconv.FormatFloat(float64(MinError), 'f', 1, 64)
	//100 employee
	MaxerrorsNum := math.Ceil(float64(MaxError*float64(attempt)/100)) * 100
	MinerrorsNum := math.Ceil(float64(MinError*float64(attempt)/100)) * 100
	AverageNum := math.Ceil(float64(averageError*float32(attempt)/100)) * 100
	wipeTotal := wipeTimes * float64(maxEmployees)

	return gin.H{
		"employees": maxEmployees,
		"money":     maxsalary,

		"time":          average,
		"mobile":        mobile,
		"totalentrysec": totalEntry,
		"maxtime":       totalMaxTime,
		"mintime":       totalMinTime,

		"error":        esitimateAverage,
		"minerror":     Minerror,
		"maxerror":     Maxerror,
		"num":          AverageNum,
		"Maxnum":       MaxerrorsNum,
		"Minnum":       MinerrorsNum,
		"failattempts": policy.failed_attempt,
		"wipe":         wipeTimes,
		"wipetotal":    wipeTotal,

		"attempt":      creattempts,
		"totalattempt": totalattempt,
		"expire":       expireTime,

		"specialNum": policy.password_complex,
		"totalTime":  totalComplex,

		"timeauth": total,

		"length":      policy.password_length,
		"class":       charclass,
		"probability": security,

		"enctime":  enctime,
		"authtime": authtotal,

		"totalmoney": moneycost,
	}

}
func Analyze_Compare(salary int, people int, policy *passwordPolicy, A *von, B *greene, C *WMelicher, D *shay) *TransCompare {
	//basic information
	newS := &TransCompare{}
	newS.length = policy.password_length
	newS.NumOfChar = policy.password_complex
	newS.expire = policy.maxPINAgeInDay
	//seconds
	average := int(math.Ceil((float64(A.overall) + float64(B.overall) + float64(C.overall) + float64(D.overall)) / 4))
	totalEntry := (average * people)
	newS.seconds = int64(totalEntry)
	//error
	//failed attempt
	errorC := (C.attempts*10 - 10) / (C.attempts * 10)
	errorD := (D.entryAtt*10 - 10) / (D.entryAtt * 10)
	averageError := (A.errorrate + B.errorrate + errorC + errorD) / 4
	attempt := 365 * 4
	wipeTimes := math.Ceil(math.Pow(float64(averageError), float64(policy.failed_attempt)) * float64(attempt))
	wipeTotal := math.Ceil(wipeTimes * float64(people))
	AverageNum := math.Ceil(float64(averageError*float32(attempt)/100)) * 100
	newS.wipeNum = int64(wipeTotal)
	newS.errors = int64(AverageNum * float64(people))
	//char class
	charclass := 2
	if policy.password_complex > 0 {
		charclass = 3
	}
	newS.charclass = int64(charclass)
	//attempts
	averageAttempts := (C.attempts + D.entryAtt) / 2
	peopleMulDays := float64(365 * 4 * people)
	newS.Entryattempts = int64(math.Ceil(float64(averageAttempts) * peopleMulDays * float64(salary)))
	//security level
	switch D.security {
	case "smaller than 10%":
		newS.securityLevel = 0
	case "range from 10% to 20%":
		newS.securityLevel = 1
	case "range from 20% to 30%":
		newS.securityLevel = 2
	case "larger than 30%":
		newS.securityLevel = 3
	case "range from 30% to 40%":
		newS.securityLevel = 3
	case "range from 40% to 50%":
		newS.securityLevel = 4
	case "larger than 40%":
		newS.securityLevel = 4
	case "larger than 50%":
		newS.securityLevel = 5
	}

	//money : entry
	moneycost := (totalEntry) * salary
	newS.money = int64(moneycost)

	return newS
}

func comparemoney(people int, money int, seconds int) int {
	return people * money * seconds
}
func FindMinMax(flist []float64) (float64, float64) {
	min := flist[0]
	max := flist[0]
	for i := 0; i < len(flist); i++ {
		if min > flist[i] {
			min = flist[i]
		}
		if max < flist[i] {
			max = flist[i]
		}
	}
	if min == 0 && max != 0 {
		sort.Float64s(flist)
		flist = flist[1:]
		min = flist[0]
	}
	return max, min
}

func main() {

	r := gin.Default()
	r.Static("/css", "templates/statics/css")
	r.Static("/js", "templates/statics/js")
	r.LoadHTMLGlob("templates/posts/*")
	r.MaxMultipartMemory = 64 << 20 // 64 MiB
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})
	r.GET("/comparesurvey.html", func(c *gin.Context) {
		c.HTML(http.StatusOK, "comparesurvey.html", gin.H{})
	})
	r.GET("/docs.html", func(c *gin.Context) {
		c.HTML(http.StatusOK, "docs.html", gin.H{})
	})
	r.GET("/docs", func(c *gin.Context) {
		fileName := c.Query("fileName")
		//打开文件
		_, errByOpenFile := os.Open("./templates/files/" + fileName)
		if errByOpenFile != nil {
			fmt.Println(errByOpenFile)
			c.Redirect(http.StatusFound, "/404")
			return
		}
		c.Header("Content-Type", "application/octet-stream")
		c.Header("Content-Disposition", "attachment; filename="+fileName)
		c.Header("Content-Transfer-Encoding", "binary")
		c.File("./templates/files/" + fileName)
		return
	})

	r.GET("/instructions", func(c *gin.Context) {
		fileName := c.Query("fileName")
		//打开文件
		_, errByOpenFile := os.Open("./" + fileName)
		if errByOpenFile != nil {
			fmt.Println(errByOpenFile)
			c.Redirect(http.StatusFound, "/404")
			return
		}
		c.Header("Content-Type", "application/octet-stream")
		c.Header("Content-Disposition", "attachment; filename="+fileName)
		c.Header("Content-Transfer-Encoding", "binary")
		c.File("./" + fileName)
		return
	})
	r.POST("/", func(c *gin.Context) {
		companyInfo := &company{}
		people := c.PostForm("scenario-question-sq-1508-scale")
		fmt.Println(people)
		switch people {
		case "smaller than 10":
			companyInfo.people = 10
		case "10 - 100":
			companyInfo.people = 100
		case "100 - 1000":
			companyInfo.people = 1000
		case "1000 - 10000":
			companyInfo.people = 10000
		case "larger than 10000":
			companyInfo.people = 10001
		}
		salary := c.PostForm("scenario-question-sq-1509-scale")
		fmt.Println(salary)
		switch salary {
		case "smaller than 10":
			companyInfo.salary = 10
		case "10 - 30":
			companyInfo.salary = 30
		case "larger than 30":
			companyInfo.salary = 31
		}
		auth := c.PostForm("scenario-question-sq-1510-scale")
		switch auth {
		case "Disable":
			companyInfo.auth = 0
		case "Codes":
			companyInfo.auth = 15
		case "Push":
			companyInfo.auth = 15
		case "SMS":
			companyInfo.auth = 15
		case "TOTP":
			companyInfo.auth = 15
		case "U2F":
			companyInfo.auth = 15
		}
		fmt.Print("auth", companyInfo.auth)
		enc := c.PostForm("scenario-question-sq-1511-scale")
		switch enc {
		case "-1":
			companyInfo.enc = 0
		case "1":
			companyInfo.enc = 9
		}
		file, err := c.FormFile("file")
		if err != nil {
			c.String(http.StatusBadRequest, "failed")
			return
		}
		// c.SaveUploadedFile(file, dst)
		name := file.Filename
		fmt.Println("file name, ", name)
		dir, _ := pathhelper.GetCurrentExecDir()
		log.Println(dir)
		// Make absolute file path.
		dst := path.Join(dir, file.Filename)

		// Upload the file to specific dst.
		c.SaveUploadedFile(file, dst)
		dictionary := Readfile(dst)
		passwordpolicy := definePaawordPolicy(dictionary)
		fmt.Println(passwordpolicy.allowSimple)
		resultA := estimateTime(passwordpolicy)
		resultB := cal(passwordpolicy)
		resultC := melicher(passwordpolicy)
		fmt.Println(resultC.creAttempts)
		resultD := CalShay(passwordpolicy)
		report := Analyze(resultA, resultB, resultC, resultD, companyInfo, passwordpolicy)
		// c.HTML(http.StatusOK, "result.html", gin.H{})
		c.HTML(http.StatusOK, "example.tmpl", report)

	})

	r.POST("/compare", func(c *gin.Context) {
		var money int
		employeesP := 0
		people := c.PostForm("moneySalary")
		fmt.Println(people)
		switch people {
		case "smaller than 10":
			employeesP = 5
		case "10 - 100":
			employeesP = 50
		case "100 - 1000":
			employeesP = 500
		case "1000 - 10000":
			employeesP = 5000
		case "larger than 10000":
			employeesP = 10000
		}
		salary := c.PostForm("money")
		switch salary {
		case "smaller than 10":
			money = 10
		case "10 - 30":
			money = 30
		case "larger than 30":
			money = 40
		}

		fileA, err := c.FormFile("fileA")
		if err != nil {
			c.String(http.StatusBadRequest, "failed")
			return
		}
		name := fileA.Filename
		fmt.Println("file name, ", name)
		dir, _ := pathhelper.GetCurrentExecDir()
		log.Println(dir)
		// Make absolute file path.
		dst := path.Join(dir, fileA.Filename)

		// Upload the file to specific dst.
		c.SaveUploadedFile(fileA, dst)
		dictionary := Readfile(dst)
		passwordpolicyA := definePaawordPolicy(dictionary)
		fmt.Println(passwordpolicyA)

		fileB, err := c.FormFile("fileB")
		if err != nil {
			c.String(http.StatusBadRequest, "failed")
			return
		}
		dir, _ = pathhelper.GetCurrentExecDir()
		log.Println(dir)
		// Make absolute file path.
		dst = path.Join(dir, fileB.Filename)
		c.SaveUploadedFile(fileB, dst)
		dictionaryB := Readfile(dst)
		passwordpolicyB := definePaawordPolicy(dictionaryB)
		fmt.Println(passwordpolicyB)
		//analyze the two password policy

		AresultVon := estimateTime(passwordpolicyA)
		AresultGreene := cal(passwordpolicyA)
		AresultMelicher := melicher(passwordpolicyA)
		AresultShay := CalShay(passwordpolicyA)
		TransA := Analyze_Compare(money, employeesP, passwordpolicyA, AresultVon, AresultGreene, AresultMelicher, AresultShay)

		BresultVon := estimateTime(passwordpolicyB)
		BresultGreene := cal(passwordpolicyB)
		BresultMelicher := melicher(passwordpolicyB)
		BresultShay := CalShay(passwordpolicyB)
		TransB := Analyze_Compare(money, employeesP, passwordpolicyB, BresultVon, BresultGreene, BresultMelicher, BresultShay)

		AsecPercent := float64(1)
		AsecPercent, _ = decimal.NewFromFloat(AsecPercent).Round(2).Float64()
		BsecPercent := float64(TransB.seconds) / float64(TransA.seconds)
		BsecPercent, _ = decimal.NewFromFloat(BsecPercent).Round(2).Float64()

		Aerror := float64(1)
		Berror := float64(TransB.errors) / float64(TransA.errors)
		Berror, _ = decimal.NewFromFloat(Berror).Round(2).Float64()

		Aattempt := float64(1)
		Battempt := float64(TransB.Entryattempts) / float64(TransA.Entryattempts)
		Battempt, _ = decimal.NewFromFloat(Battempt).Round(2).Float64()

		moneyA := comparemoney(employeesP, money, int(TransA.seconds))
		moneyB := comparemoney(employeesP, money, int(TransB.seconds))
		fmt.Println("moneyA", moneyA, TransA.seconds)
		number := gin.H{
			"ALen":       TransA.length,
			"BLen":       TransB.length,
			"ANum":       TransA.NumOfChar,
			"BNum":       TransB.NumOfChar,
			"AEx":        TransA.expire,
			"BEx":        TransB.expire,
			"moneycostA": moneyA,
			"moneycostB": moneyB,

			"Acost":  TransA.seconds,
			"Bcost":  TransB.seconds,
			"Afloat": AsecPercent,
			"Bfloat": BsecPercent,

			"Ae":     TransA.errors,
			"Be":     TransB.errors,
			"Aerror": Aerror,
			"Berror": Berror,

			"Aatt":     TransA.Entryattempts,
			"Batt":     TransB.Entryattempts,
			"Aattempt": Aattempt,
			"Battempt": Battempt,

			"SecurityLevel":  TransA.securityLevel,
			"SecurityLevelB": TransB.securityLevel,

			"WipeA": TransA.wipeNum,
			"WipeB": TransB.wipeNum,
		}
		c.HTML(http.StatusOK, "compare.html", number)
		// c.JSON(http.StatusOK, map_m)

	})

	r.Run() // listen and serve on 0.0.0.0:8080
}

/*
1 add check form
2 add reference
3 upload help documentation
4

*/
