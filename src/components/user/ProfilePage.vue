<template>
  <v-container>
    <v-layout>
      <v-flex xs3>
        <div class="infos elevation-3">
          <h6 class="text-xs-center">About Me</h6>
          <v-divider></v-divider>
          <v-icon>cake</v-icon>
          <p>Date of Birth Bla bla bla</p>
          <v-divider></v-divider>
          <v-icon>subject</v-icon>
          <p>Eddy Malou (E double D Y trait d'union M A L O U) dont la signification est imposer la force vers le valium[1], c'est à dire l'estime du savoir (les gens qui connaissent beaucoup de choses), est le premier savant de toute la République Démocratique du Congo.</p>
        </div>
      </v-flex>
      <v-flex xs9>
        <v-container>
          <v-layout>
            <v-flex xs10>
              <v-text-field
                prepend-icon="message"
                placeholder="Envoyer un message"
                single-line
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn primary block top left class="white--text">Envoyer <v-icon right>send</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        <div class="timeline">
          <div class="line"></div>
          <div class="timeline-elem">
            <div class="date-content">
              <div class="content content-img">
                <img class="elevation-5" src="http://localhost:3030/uploads/3bf35d494e1f6b33b369e31da5359991.jpeg">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. </p>
              </div>
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. </p>
              </div>
            </div>
            <div class="meta-date">
              <span class="date">18</span>
              <span class="month">apr.</span>
            </div>
          </div>
          <div class="timeline-elem">
            <div class="date-content">
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is.</p>
              </div>
            </div>
            <div class="meta-date">
              <span class="date">17</span>
              <span class="month">apr.</span>
            </div>
          </div>
          <div class="timeline-elem">
            <div class="date-content">
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is.</p>
              </div>
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. </p>
              </div>
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. </p>
              </div>
              <div class="content">
                <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. </p>
              </div>
            </div>
            <div class="meta-date">
              <span class="date">16</span>
              <span class="month">apr.</span>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { VExpansionPanel, VBtn, VIcon, VTextField, VDivider } from 'vuetify/es5/components'
import VExpansionPanelContent from 'vuetify/es5/components/VExpansionPanel/VExpansionPanelContent'
import { VContainer, VFlex, VLayout } from 'vuetify/es5/components/VGrid'
import gql from 'graphql-tag'
export default {
  data() {
    return {}
  },
  components: {
    VDivider,
    VTextField,
    VExpansionPanel,
    VExpansionPanelContent,
    VBtn,
    VIcon,
    VContainer,
    VFlex,
    VLayout
  }
}
</script>


<style lang="stylus">
  @import '../../stylus/main.styl';

  .infos {
    min-height 120px;
    padding: 15px;
    h6 {
      color: rgba(0,0,0,0.87);
    }

    .icon {
      font-size 20px;
      padding-top 10px;
      padding-bottom 10px;
    }

    p {
      line-height 20px;
      display inline-flex;
      width calc(100% - 34px);
    }
  }

  .timeline {
    position: relative;
    width: 100%;
    .line {
      position: absolute;
      width: 3px;
      height: 100%;
      top: 0;
      left: 50px;
      background: #bcbcbc;
      z-index: 0;
    }

    .timeline-elem {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      margin: 20px 0;

      .date-content {
        max-width: 100%;
        width: auto;
        margin-left: 110px;
        min-height: 53px;

        .content {
          position: relative;
          border-radius: 4px;
          width: auto;
          background-color: #e4e4e4;
          box-shadow: 0 1px 3px rgba(0,0,0,.03);
          min-height: 62px;
          padding: 15px;
          margin-bottom: 10px

          img {
            margin-top: -50px;
            border-radius: 50%;
            width: 100px;
            height 100px;
          }

          p {
            margin-bottom 0;
          }
        }

        .content-img {
          margin-top: 50px;
          min-height 80px;

          p {
            padding-left 115px;
            margin-top: -50px;
          }
        }

        .content:last-child {
          margin-bottom 0;
        }
      }

      .meta-date {
        position: absolute;
        top: 0;
        left: 20px;
        width: 62px;
        height: 62px;
        color: #bcbcbc;
        background-color: #fafafa;
        border-radius: 100%;
        border: 3px solid #bcbcbc;

        .date, .month {
          display: block;
          text-align: center;
          font-weight: 900;
        }

        .date {
          font-size: 28px;
          line-height: 40px;
        }

        .month {
          font-size: 16px;
          line-height: 5px;
        }
      }
    }
  }
</style>
