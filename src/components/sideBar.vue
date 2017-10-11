<template>
	<div class="menu">
		<h1>
			<img src="img/logo.png" alt="">
		</h1>

    <div class="menu-user" v-if="userInfo">
      <img src="img/avatar.jpg" alt="" class="menu-user-avatar">
      <span>{{userInfo.account}}</span>
    </div>

    <div class="menu-info" v-if="!userInfo">
      <section class="menu-info-input">
        <h5>Account</h5>
        <input type="text" v-model="login.account" @blur="isSigned">
      </section>
      <section class="menu-info-input">
        <h5>Password</h5>
        <input type="password" v-model="login.password">
      </section>
      <div v-if="!hasSigned">
        <section class="menu-info-input">
          <h5>Confirm password</h5>
          <input type="password" v-model="signup.confirmPassword">
        </section>
        <section class="menu-info-input">
          <h5>Captcha</h5>
          <input type="text" v-model="signup.captchaCode">
          <p @click="getCaptcha">{{captcha}}</p>
        </section>
        <section class="menu-info-input">
          <button @click="submitSignup">Signup</button>
        </section>
      </div>

      <div v-if="hasSigned">
        <section class="menu-info-input">
          <button @click="submitLogin">Login</button>
        </section>
      </div>
    </div>

    <div class="menu-info" v-if="userInfo">
      <section class="menu-info-input">
        <h5>Title</h5>
        <input type="text" v-model="doc.title">
      </section>
      <section class="menu-info-input">
        <h5>Category</h5>
        <input type="text" v-model="doc.category">
      </section>
      <section class="menu-info-input">
        <h5>Author(s)</h5>
        <input type="text"  v-model="doc.author">
      </section>
      <section class="menu-info-input">
        <button @click="submitDoc">Submit</button>
      </section>
    </div>
		
		<div class="copy-right">
			Copyright © 2016 Jrain Lau
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { domain } from '../../config/index.js'

export default {
  data () {
    return {
      login: {
        account: '',
        password: ''
      },
      signup: {
        confirmPassword: '',
        captchaCode: ''
      },
      doc: {
        title: '',
        category: '',
        author: ''
      },
      userInfo: null,
      token: '',
      hasSigned: true,
      captcha: '',
      domain
    }
  },
  computed: {
    content () {
      return this.$store.state.articleList[0].content
    }
  },
  mounted () {
    this.verifyUser()
  },
  methods: {
    verifyUser () {
      axios.post(`${domain}/user/verify`, {
        token: sessionStorage.token
      }).then((res) => {
        if (res.status === 200) {
          this.userInfo = res.data.info
        }
      })
    },
    submitSignup () {
      if (this.login.password === this.signup.confirmPassword) {
        axios.post(`${domain}/user/signup`, {
          account: this.login.account,
          password: this.signup.confirmPassword,
          captcha: this.signup.captchaCode
        }).then((res) => {
          if (!res.data.message) {
            this.$alert('注册成功！', '', 'success')
            this.submitLogin()
          } else {
            this.$alert(res.data.message, '请重新输入', 'error')
          }
        })
      }
    },
    submitLogin () {
      axios.post(`${domain}/user/login`, {
        account: this.login.account,
        password: this.login.password
      }).then((res) => {
        if (res.status === 200) {
          this.token = sessionStorage.token = res.data.token
          this.userInfo = res.data.info
        }
      })
    },
    isSigned (e) {
      axios.post(`${domain}/user/signed`, {
        account: e.target.value
      }).then((res) => {
        if (res.status === 200) {
          this.hasSigned = true
        }
      }).catch((e) => {
        this.hasSigned = false
        this.getCaptcha()
      })
    },
    getCaptcha () {
      axios.get(`${domain}/user/captcha`).then((res) => {
        this.captcha = res.data
      })
    },
    submitDoc () {
      axios({
        url: `${domain}/doc/add`,
        method: 'post',
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        data: {
          title: this.doc.title,
          category: this.doc.category,
          author: this.doc.author,
          content: this.content,
          date: new Date()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
	.menu {
		box-sizing: border-box;
		position: relative;
		float: left;
		height: 100%;
		width: 220px;
		box-shadow: 4px 5px 3px #aaa;
		background-color: #f5f5f5;
		h1 {
			margin: 0;
			height: 75px;
			line-height: 75px;
			text-align: center;
			img {
				width: 125px;
				vertical-align: middle;
			}
    }
    &-user {
      margin: 15px 0;
      img {
        display: block;
        width: 125px;
        height: 125px;
        background: #eee;
        border-radius: 125px;
        margin: 15px auto;
        object-fit: cover;
        object-position: center center;
      }
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
    &-info {
      padding: 0 15px;
      box-sizing: border-box;
      &-input {
        h5 {
          margin: 15px 0 5px 0;
        }
        input {
          width: 100%;
          box-sizing: border-box;
          padding: 5px;
          border: none;
          border-bottom: 1px solid #009688;
          background: transparent;
          outline: none;
        }
        button {
          box-sizing: border-box;
          width: 100%;
          margin: 35px 0;
          height: 45px;
          line-height: 45px;
          background: transparent;
          border: 1px solid #009688;
          border-radius: 0;
          font-size: 16px;
          color: #009688;
          outline: none;
          &:hover {
            background: rgba(0, 139, 125, .8);
            color: #fff;
          }
          &:active {
            background: rgba(0, 139, 125, 1);
            color: #fff;
          }
        }
      }
    }
		.copy-right {
			position: absolute;
			bottom: 10px;
			width: 100%;
			font-size: 12px;
			text-align: center;
			color: #9E9E9E;
		}
	}
</style>