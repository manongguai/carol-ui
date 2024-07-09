<template>
  <cl-form label-position="left" label-width="150px" style="max-width: 460px">
    <cl-space fill>
      <cl-alert type="info" show-icon :closable="false">
        <p>"Full Name" label is automatically attached to the input:</p>
      </cl-alert>
      <cl-form-item label="Full Name">
        <cl-input v-model="formAccessibility.fullName" />
      </cl-form-item>
    </cl-space>
    <cl-space fill>
      <cl-alert type="info" show-icon :closable="false">
        <p>
          "Your Information" serves as a label for the group of inputs. <br />
          You must specify labels on the individal inputs. Placeholders are not
          replacements for using the "label" attribute.
        </p>
      </cl-alert>
      <cl-form-item label="Your Information">
        <cl-row :gutter="20">
          <cl-col :span="12">
            <cl-input
              v-model="formAccessibility.firstName"
              label="First Name"
              placeholder="First Name"
            />
          </cl-col>
          <cl-col :span="12">
            <cl-input
              v-model="formAccessibility.lastName"
              label="Last Name"
              placeholder="Last Name"
            />
          </cl-col>
        </cl-row>
      </cl-form-item>
    </cl-space>
  </cl-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formAccessibility = reactive({
  fullName: '',
  firstName: '',
  lastName: '',
})
</script>
