<template>
  <div :class="ns.b()">
    <!-- 左侧login 及描述 -->
    <div :class="ns.e('left')">
      <div :class="ns.em('left', 'content')">
        <el-image
          :src="logoSrc"
          alt="logo"
          fit="fill"
          :class="ns.e('logo')"
          @click="logoClickHandler"
        ></el-image>
        <h3 v-if="title" :class="ns.e('title')">
          {{ title }}
        </h3>
      </div>
      <!-- 用于延展背景 -->
      <div :class="ns.em('left', 'placeholder')"></div>
    </div>
    <slot name="middle" />
    <!-- 右侧按钮 -->
    <div :class="ns.e('right')">
      <el-tooltip v-if="questionPageUrl" placement="bottom">
        <template #content>我要提问</template>
        <el-badge :hidden="true">
          <el-icon size="25px" color="#FFF" :class="ns.e('icon')" @click="handleHelpClick">
            <QuestionFilled></QuestionFilled>
          </el-icon>
        </el-badge>
      </el-tooltip>
      <el-badge :hidden="msgNum === 0" :value="msgNum" :class="ns.e('icon')">
        <el-icon size="25px" color="#FFF" @click="handleMessageClick"><Bell></Bell></el-icon>
      </el-badge>
      <el-dropdown trigger="click" :popper-class="ns.e('dropdown')" @command="handleAvatarCommand">
        <el-avatar v-if="avatarUrl" :size="30" :src="avatarUrl" :class="ns.e('avatar')"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="t in avatarOptList" :key="t.key" :command="t.event">
              {{ t.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs } from 'vue'
import { useNamespace } from '@/hooks'
import { toolbarProps, toolbarEmits, AvatarOptItem } from './toolbar'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'Toolbar',
})

// css 命名空间
const ns = useNamespace('toolbar')

// props
const props = defineProps(toolbarProps)

const { logoSrc, title, msgNum, avatarUrl, questionPageUrl } = toRefs(props)

// emits
const emits = defineEmits(toolbarEmits)

// 头像下拉操作列表
const avatarOptList: Array<AvatarOptItem> = [
  {
    key: 'changePwd',
    text: '修改密码',
    event: 'changePwd',
  },
  {
    key: 'logout',
    text: '注销',
    event: 'logout',
  },
]

// logo 点击事件
const logoClickHandler = () => {
  emits('logoClick')
}

// 我要提问按钮点击事件
const handleHelpClick = () => {
  questionPageUrl?.value && window.open(questionPageUrl.value, '_blank')
}

// 消息按钮点击事件
const handleMessageClick = () => {
  emits('showMessage')
}

const handleAvatarCommand = (command: string) => {
  emits(command)
}
</script>
