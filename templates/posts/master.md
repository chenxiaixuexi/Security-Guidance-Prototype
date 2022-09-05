##设计思路
实验部分，为了更好的给用户提供可视化服务，本项目查看了两个常用的ios和MacOS的安全策略设置应用。
是apple configurator 和 imazing profile editor。用户可以选择password poliicy，最后导出出后缀名为mobileconfig的配置文件，可以直接导入到ios，macos设备，或者配置到MDM中。为了确认不同的软件的安全配置参数都是相似的，项目在两个软件中到处相同的密码策略。通过观察发现，主要的密码配置策略有10个参数供调节，参数如下:
1. allowSimple: true/force, permit the use of repeating, ascending, character sequences. 用户可以选择true或者force， 此参数表示是否允许密码存在重复，升序或者降序的sequences.
2. forcePIN: 此参数也是可以选择true或者force，它表示当用户在设备输入密码的时候，需要PIN code来认证。
3. maxFailedAttempts: 用户可以输入the maximum number of passcode entry attempts allowed before all data on device will be wiped.
4. maxGracePeriod: 用户可以输入最长的grace period(in minute)来确认how soon the device can be unlocked again after use, without reprompting again for the passcode。
5. maxInactivity: If the device isn't used for the period of time you specify, it automatically locks. It can be set to lock after 1 to 15 minutes, or turned off with a value of 0. In macOS, this grace period value and inactivity time are translated to screen-saver settings
6. maxPINAgeInDays: The criteria requires users to change their passcode at the specified interval. It can be set to between 1 and 730 days, or turned off with a value of 0.
7. minComplexChars: The parameter aims to configure the smallest number of non-alphanumeric characters allowed. It can be set to between 1 and 4.
8. minLength: The parameter defines the minimum number of characters a password can contain.
9. pinHistory: the configuration requires users to input the number of unique passcode before reuse, in such case it can prevent new password from reusing.
10. requireAlphanumeric: this parameter requires passcode to contain at least one letter and one number.

根据CMU的两篇文献，他们研究了不同复杂度密码，并且测试了输入时间，生成时间，重新输入的次数。因此根据这两篇paper的结果，我们可以估算出雇员一年需要花费的时间。对于william，首先我们将3class的密码输入时间取平均值求出大致速度再乘长度计算出大概时间，同理计算2word类型密码和basic20，这类密码只要求有20个character。值得注意的是，这个研究没有规定密码来测试，是用户选择自己的密码，因此长度有可能长于最低要求，或者密码更复杂。
此外，另一篇paper提供了输入字符的速度和所需要的时间，我们也可以估算出来一个大致结果。
最终，对于安全经理提供的密码策略，我们可以得到一份详细的report，从而直观的让经理可以进行对比。
不仅如此，根据比如第二篇文章中提到的影响密码表现的策略，这个项目也可以提供建议。他们计算了影响密码输入时间的因素等，再根据密码复杂度所提供的安全性（cmu），可以提出在不影响安全性的前提下，可以有效降低密码策略的建议。根据结论可以知道2word16，basic20和3word20的安全性是最强的。同时作者总结出最影响密码认证，输入和错误率的是密码的长度。因此，综合两种情况，和他们三个密码的输入时间，对比得知2word16是所需要时间最短的。从而当安全经理选择长度超过20，或者长度超过16密码复杂度过高的密码，可以给出建议使用2word16密码类型。并且在shay et al.的这篇文章中，可以看到在10^12 guesses之后， basic20和2word16的概率相同，约15%。并且basic16和3class12在20%到30%的区间。
｜type｜numer｜
｜----  | ----  |
| basic12  | 40-50 |
| 2word12  | 30-40|
| 3class12  | 20-30 |

｜type｜numer｜
｜----  | ----  |
| basic16  | 20-30 |
| 2word16  | 10-20 |
| 3class16  | 0-10 |

第二点，不仅如此从数据可以发现3class8密码虽然输入时间短，但是它的安全程度较低，因此这个原型也会给出建议，安全经理可以根据此建议来修改密码策略。
第三点，greene et al. 在实验前设置了输入的string，因此根据平均时间对比字符串可以发现，在相同长度和差别很小的shift键使用次数，可以看出更多的non-alphanumeric character出现会增加额外的时间。如图中相同长度的string 8 and string 2，尽管string8需要的key-stroke和shift次数更多，string 2包含更多的non-alphanumeric character且需要输入时间更长，约三秒。不仅如此，
string 5和string 6也是长度相同且shift键使用次数相同，但是string 6仍额外需要两秒。因此此原型将应用这个发现在估算minComplexChars配置所产生的额外时间上。
第四点， usable， We interpret taking more password-creation attempts as be- ing less usable. Participants took an average of 1.9 attempts to create a password. 

	// r.POST("submit", func(c *gin.Context) {
	// 	duration := c.PostForm("duration")
	// 	len := c.PostForm("len")
	// 	complex := c.PostForm("com")
	// 	// device := c.PostForm("device")
	// 	total := 0.0
	// 	if complex == "dictionary" {
	// 		total += 1.5
	// 	} else if complex == "internet" {
	// 		total += 3.5
	// 	} else if complex == "random" {
	// 		total += 7.5
	// 	}
	// 	if len == "8" {
	// 		total += 13.7
	// 	} else if len == "12" {
	// 		total += 14.4
	// 	} else if len == "16" {
	// 		total += 18.0
	// 	}

	// 	if duration == "30" {

	// 	} else if duration == "60" {

	// 	} else if duration == "120" {

	// 	}
	// 	auth := c.PostForm("auth")
	// 	switch auth {
	// 	case "code":
	// 		total += 28.0
	// 	case "Push":
	// 		total += 16.1
	// 	case "SMS":
	// 		total += 18.5
	// 	case "TOTP":
	// 		total += 23.9
	// 	case "U2F":
	// 		total += 13.0
	// 	}
	// 	total = total * 4 * 365 / 60
	// 	final := strconv.FormatFloat(total, 'f', 2, 64)
	// 	c.String(http.StatusOK, "Results: The policy could take each employee %s minutes for a year\n", final)
	// })