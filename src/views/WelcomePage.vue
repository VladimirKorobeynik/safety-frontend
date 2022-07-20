<template>
  <main-section></main-section>
  <about-section></about-section>
  <application-section></application-section>
  <device-section></device-section>
  <get-started-section></get-started-section>
  <calculate-section></calculate-section>
  <footer-component></footer-component>
</template>

<script>
import MainSection from "@/components/welcome-page/MainSection.vue";
import AboutSection from "@/components/welcome-page/AboutSection.vue";
import ApplicationSection from "@/components/welcome-page/ApplicationSection.vue";
import DeviceSection from "@/components/welcome-page/DeviceSection.vue";
import GetStartedSection from "@/components/welcome-page/GetStartedSection.vue";
import CalculateSection from "@/components/welcome-page/CalculateSection.vue";
import FooterComponent from "@/components/welcome-page/FooterComponent.vue";

export default {
  name: 'welcome-page',
  components: {
    MainSection,
    AboutSection,
    ApplicationSection,
    DeviceSection,
    GetStartedSection,
    CalculateSection,
    FooterComponent
  }
}
</script>
