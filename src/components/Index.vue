<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-spacer></v-spacer>
      <v-btn color="success" v-if="testing == false" @click="startTest">
        {{ text.start_text }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row wrap fill-height>
          <!-- start page -->
          <v-col md4 offset-md4 v-if="currentStep == 0">
            <v-card>
              <v-card-title>{{ text.following_step }}</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="item in testUnites" :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.label }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- result page -->
          <v-col md4 offset-md4 v-else-if="currentStep == 7">
            <v-card>
              <v-card-title>{{ text.test_report }}</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="item in testUnites" :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.label }}</v-list-item-title>
                      <v-icon v-if="item.notError" color="success">良好</v-icon>
                      <v-icon v-else color="error">异常</v-icon>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col md4 offset-md4 v-else>
            <v-stepper v-model="currentStep">
              <v-stepper-header>
                <v-stepper-step :complete="currentStep > 0" step="1">
                  兼容性测试
                </v-stepper-step>

                <v-divider></v-divider>
                <v-stepper-step :complete="currentStep > 1" step="2">
                  麦克风测试
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 2" step="3">
                  扬声器测试
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 3" step="4">
                  分辨率测试
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 4" step="5">
                  连通性测试
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 5" step="6">
                  摄像头预览测试
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="currentStep > 6" step="7">
                  检测结果
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!-- system requirements test -->
                <v-stepper-content step="1">
                  <v-row>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="headline">
                            {{ text.browser_check }}
                          </div>
                        </v-card-title>
                        <v-card-text>
                          {{ text.support_desc }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          {{ text.checking }}
                        </v-card-title>
                        <v-card-text>
                          <div v-if="navInfo">{{navInfo}}</div>
                          <v-progress-linear
                            :indeterminate="true"
                          ></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <!-- mic test -->
                <v-stepper-content step="2">
                  <v-row>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="headline">
                            {{ text.microphone_check }}
                          </div>
                        </v-card-title>
                        <v-card-text>
                          {{ text.microphone_check_desc }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          {{ text.microphone_volume_check_desc }}
                        </v-card-title>
                        <v-card-text>
                          <v-progress-linear
                            :value="inputVolume"
                          ></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <!-- speaker test -->
                <v-stepper-content step="3">
                  <v-row>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="headline">
                            {{ text.speacker_check }}
                          </div>
                        </v-card-title>
                        <v-card-text>
                          {{ text.speaker_check_desc }}
                        </v-card-text>
                        <v-btn @click="speakerTest" style="margin-left:16px"> 听得见 </v-btn>

                        <v-btn @click="speakerTestError" text color="error"> 听不见 </v-btn>
                      </v-card>
                    </v-col>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="headline">{{ text.sample_music }}</div>
                        </v-card-title>
                        <v-card-text>
                          <audio id="sampleMusic" ref="audio" controls="controls">
                            <source
                              src="../assets/music.mp3"
                              type="audio/mp3"
                            />
                            {{ text.sample_music_desc }}
                          </audio>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <!-- resolution test -->
                <v-stepper-content step="4">
                  <v-row>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="headline">
                            {{ text.resolution_check }}
                          </div>
                        </v-card-title>
                        <v-card-text>
                          {{ text.resolution_check_desc }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col md6>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          {{ text.resolution_list }}
                        </v-card-title>
                        <v-card-text>
                          <v-list>
                            <v-list-item
                              v-for="(profile, index) in profiles"
                              :key="index"
                            >
                              <v-list-item-content>
                                <v-list-item-title>{{
                                  profile.resolution
                                }}</v-list-item-title>
                                <v-list-item-action icon>
                                  <v-icon
                                    v-if="profile.status === 'resolve'"
                                    color="success"
                                    >良好</v-icon
                                  >
                                  <v-icon
                                    v-else-if="profile.status === 'reject'"
                                    color="error"
                                    >异常</v-icon
                                  >
                                  <v-icon v-else>等待中</v-icon>
                                </v-list-item-action>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <!-- connection test -->
                <v-stepper-content step="5">
                  <v-row md12 v-if="subscribed == false">
                    <v-alert>
                      {{ text.network_check_desc }}
                    </v-alert>
                  </v-row>
                  <v-row v-else>
                    <v-col md6>
                      <v-card height="100%">
                        <v-card-text>
                          <ve-line
                            :data="bitrateData"
                            :settings="chartSettings"
                          ></ve-line>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col md6>
                      <v-card height="100%">
                        <v-card-text>
                          <ve-line
                            :data="packetsData"
                            :settings="chartSettings"
                          ></ve-line>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>
                <!-- camera test -->
                <v-stepper-content step="6">
                  <v-row style="min-height: 360px" ref="row">
                    <v-col>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-text>
                        <v-row>
                          <v-col class="d-flex">
                            <v-select
                              :items="items"
                              :label="value_type ?'':'请选择摄像头'"
                              dense
                              solo
                              v-model="value_type"
                            ref="select" style="max-width:100%" 
                            @change="cameraPreview(value_type)"></v-select>
                            <!-- <v-btn @click="cameraPreview" style="margin-left:16px"> 确定 </v-btn> -->
                          </v-col>
                          
                        </v-row>
                        
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card color="rgba(0,157,231,0.2)" height="100%">
                        <v-card-title>
                          <div class="row">
                            {{ text.show }}
                          </div>
                        </v-card-title>
                        <v-card-text>
                        <div id="videoPlay" ref="video"></div>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as i18n from "../utils/i18n";
import * as webRTC from "../utils/NIM_Web_NERTC_v4.6.0";
import { profileArray } from "../utils/resolutionList";
export default {
  name: "Index",

  data() {
    return {
      client: {},
      localStream: {},
      currentStep: 0,
      inputVolume: 0,
      uid: "",
      meetSystemRequirements: false,
      testUnites: [
        {
          id: "0",
          label: "浏览器兼容性",
          notError: true,
          extra: "",
        },
        {
          id: "1",
          label: "麦克风",
          notError: true,
          extra: "",
        },
        {
          id: "2",
          label: "扬声器",
          notError: true,
          extra: "",
        },
        {
          id: "3",
          label: "分辨率",
          notError: true,
          extra: "",
        },
        {
          id: "4",
          label: "连通性",
          notError: true,
          extra: "",
        },
        {
          id: "5",
          label: "摄像头预览",
          notError: true,
          extra: "",
        }
      ],
      profiles: profileArray.map((item) => {
        item.status = "pending";
        return item;
      }),
      chartSettings: {},
      bitrateData: {
        columns: ["index", "发送视频码率", "发送音频码率"],
        rows: [
          {
            index: 0,
            发送视频码率: 0,
            发送音频码率: 0,
          },
        ],
      },
      packetsData: {
        columns: ["index", "发送视频丢包率", "发送音频丢包率"],
        rows: [
          {
            index: 0,
            发送视频丢包率: 0,
            发送音频丢包率: 0,
          },
        ],
      },
      subscribed: false,
      testing: false,
      navInfo:false,
      items:[],
      value_type:"",
    };
  },
  computed: {
    text() {
      const lang = "zh";
      const property = i18n[lang]["default"];
      const obj = {};
      for (let key of Object.keys(property)) {
        Object.assign(obj, {
          [`${key}`]: property[key],
        });
      }
      return obj;
    },
  },
  mounted() {
    webRTC.getParameters().allowEmptyMedia = true
    window.yx=this;
    this.client = webRTC.createClient({
      appkey: "45c6af3c98409b18a84451215d0bdd6e",
      debug: true,
    });
  },
  methods: {
    startTest() {
      this.currentStep++;
      this.testing = true;
      setTimeout(() => {
        this.systemRequirementsTest();
        
      }, 1500);
    },
    systemRequirementsTest() {
      //第一步检测浏览器兼容性
      try{
        this.meetSystemRequirements = webRTC.checkSystemRequirements();
        if(this.meetSystemRequirements){
          this.text.checking="浏览器已适配";
         this.navInfo=navigator.userAgent;
          this.$forceUpdate();
        }else{
          this.text.checking="浏览器未适配";
          this.navInfo=navigator.userAgent;
          this.$forceUpdate(); 
        }
        console.log("浏览器兼容性已检测完！！！");
        setTimeout(()=>{
          this.currentStep++;
          this.audioTest()
        }, 2000);
        
      }catch(ex){
        (this.testUnites.find(e=>e.id==0)).notError=false; 
      }
      
    },
    audioTest() {
      //第二步检测麦克风可用性
      let localUid=Math.floor(Math.random() * 10000);
      this.client
          .join({
            channelName: "房间名称",
            uid: localUid,
            token: "",
          })
          .then(() => {
            console.info("加入房间成功...");
            //初始化本地流
            let localStream = webRTC.createStream({
              uid: localUid,
              audio: true,
              video: false,
            });
            //启动媒体，打开实例对象中设置的媒体设备
            localStream
              .init()
              .then(() => {
                console.warn("音视频开启完成，可以播放了");
                localStream
                  .play(null, {
                    audio: true,
                    video: false,
                  })
                  .then(() => {
                    console.warn("播放成功");
                  })
                  .catch((err) => {
                    console.warn("播放失败: ", err);
                    (this.testUnites.find(e=>e.id==1)).notError=false;
                  });
               })
              .catch((err) => {
                console.warn("音视频初始化失败: ", err);
                localStream=null;
                (this.testUnites.find(e=>e.id==1)).notError=false; 
              });

            let _this = this;
            let micTestTimer = setInterval(() => {
              _this.inputVolume = parseInt(localStream.getAudioLevel() * 100);
            }, 100);
            setTimeout(async() => {
              try{
                clearInterval(micTestTimer);
                //这里的异步函数增加 await逻辑，确保stream销毁之后再leave
                await localStream.close({ type: "audio"});
                localStream.destroy();
                console.log(localStream);
                await this.client.leave();
                this.currentStep =3;
              }catch(err){
                console.warn("音频销毁失败: ", err);
                localStream=null;
                (this.testUnites.find(e=>e.id==1)).notError=false; 
                this.currentStep =3;
              }
            }, 5000);
          }).catch((err)=>{
            console.warn("加入房间失败: ", err);
            (this.testUnites.find(e=>e.id==1)).notError=false; 
            this.currentStep =3;
          })
    },
    speakerTest() {
      //第三步检测扬声器可用性
      this.$refs.audio.pause();
      this.resolutionTest();
    },
    speakerTestError() {
      console.warn("本地扬声器异常，请做对应的检测！")
      this.$refs.audio.pause();
      this.resolutionTest();
      (this.testUnites.find(e=>e.id==2)).notError=false;
    },
    async resolutionTest() {
      this.currentStep = 4;
        let localStream = webRTC.createStream({
            uid: Math.floor(Math.random() * 10000),
            audio: false,
            video: false,
          });
        let Profile=new Array(2,4,8,16);//分辨率枚举值
        console.log(this.profiles);
        for(let i in Profile){
          try{
            localStream.setVideoProfile({
              resolution: Profile[i],
              frameRate: webRTC.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_15,
            })
            await localStream.open({type:"video"})
            console.log(`${localStream.getVideoTrack().getSettings().height}P init success`);
            this.profiles[i].status = "resolve";
            await localStream.close({type:"video"});
          }catch{
            console.log('stream init failed');
            this.profiles[i].status = "reject";   
            localStream=null;
          }
        }
      setTimeout(() => {
          console.log(localStream);
          this.connectionTest();
        }, 3000);
      

    },
    connectionTest() {
      this.currentStep = 5;
      this.connectionBuild().then(([localUid, remoteClient]) => {
        this.renderChart(localUid, remoteClient);
      });
    },
    connectionBuild() {
      return new Promise((resolve) => {
        let localUid = Math.floor(Math.random() * 10000);
        let cameraId="";
       navigator.mediaDevices.enumerateDevices().then((devices)=>{
        for(let j in devices){
          //为了过滤虚拟摄像头导致检测结果不准
          if(devices[j].kind=="videoinput"&&devices[j].label.indexOf("Virtual")==-1&&devices[j].label.indexOf("virtual")==-1){
            cameraId=devices[j].deviceId;
            console.log(devices[j].deviceId+devices[j].label);       
           }
        }
        this.client
          .join({
            channelName: "房间名称",
            uid: localUid,
            token: "",
          })
          .then(() => {
            console.info("加入房间成功...");
            //初始化本地流，并且发布
            let localStream = webRTC.createStream({
              uid: localUid,
              audio: true,
              video: true,
              cameraId:cameraId,
              client:this.client
            });
            
            //启动媒体，打开实例对象中设置的媒体设备
            localStream.setVideoProfile({
          resolution: webRTC.VIDEO_QUALITY.VIDEO_QUALITY_720p,
          frameRate: webRTC.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_15,
        })
            localStream
              .init()
              .then(() => {
                console.warn("音视频开启完成，可以播放了");
                // 发布
                this.client
                  .publish(localStream)
                  .then(() => {
                    console.warn("本地 publish 成功");
                  })
                  .catch((err) => {
                    console.error("本地 publish 失败: ", err);
                  });
              })
              .catch((err) => {
                console.warn("音视频初始化失败: ", err);
                localStream = null;
              });
          });
        })

        let remoteClient = webRTC.createClient({
          appkey: "45c6af3c98409b18a84451215d0bdd6e", //您的 appkey
          debug: true, //是否开启调试日志
        });
        let remoteUid = Math.floor(Math.random() * 10000);
        remoteClient
          .join({
            channelName: "房间名称",
            uid: remoteUid,
            token: "",
          })
          .then(() => {
            console.info("加入房间成功...");
          });

        remoteClient.on("stream-added", (evt) => {        
          let remoteStream = evt.stream;
          console.warn("收到对方发布的订阅消息: ", remoteStream.getId());
          remoteStream.setSubscribeConfig({
            audio: false,
            video: true,
          });
          remoteClient
            .subscribe(remoteStream)
            .then(() => {
              console.warn("本地 subscribe 成功");
              this.subscribed = true;
            })
            .catch((err) => {
              console.warn("本地 subscribe 失败: ", err);
            });
        });

        resolve([localUid, remoteClient]);
      });
    },
    renderChart(localUid, remoteClient) {
      let _this = this;
      let indexCount = 1;

      let statsTimer = setInterval(async () => {
        const localVideoStats = await _this.client.getLocalVideoStats();
        const localAudioStats = await _this.client.getLocalAudioStats();
        const remoteVideoStatsMap = await remoteClient.getRemoteVideoStats();
        const remoteAudioStatsMap = await remoteClient.getRemoteAudioStats();
        if(localVideoStats[0]!=null && localAudioStats[0]!=null){
            _this.bitrateData.rows.push({
              index: indexCount,
              发送视频码率: localVideoStats[0].SendBitrate,
              发送音频码率: localAudioStats[0].SendBitrate,
            });
        }

        if(remoteVideoStatsMap[localUid]!=null && remoteAudioStatsMap[localUid]!=null){
            _this.packetsData.rows.push({
            index: indexCount,
            发送视频丢包率: remoteVideoStatsMap[localUid].PacketLossRate,
            发送音频丢包率: remoteAudioStatsMap[localUid].PacketLossRate,
          });
        }

        indexCount++;
      }, 1000);

      setTimeout(async() => {
        clearInterval(statsTimer);
        await this.client.leave();
        await remoteClient.leave();
        this.currentStep = 6;
        this.deviceInit();
      }, 15000);
    },
    async deviceInit(){
      let devices= await navigator.mediaDevices.enumerateDevices();
        for(let j in devices){
          if(devices[j].kind=="videoinput"){
            this.items.push({text:devices[j].label,value:devices[j].deviceId});
          }
        }
    },
    async cameraPreview(val){
      console.log(val);
      let localUid = Math.floor(Math.random() * 10000);
      try{
        if(typeof(val)!="string"){
          alert("请选择正确的摄像头");
        }else{
          if(window.yx.localStream.getVideoTrack!=null){
            await window.yx.localStream.close({ type: "video"});
          }
          this.localStream = webRTC.createStream({
                  uid: localUid,
                  audio: false,
                  video: true,
                  cameraId:val,
                  client:this.client
                });
          await this.localStream.init();
          await this.localStream.play(this.$refs.video,{ audio:false,video: true});
          this.localStream.setLocalRenderMode({
                width: 480,
                height: 300,
                cut: true    // 是否裁剪
              }, "video");
        }
        setTimeout(async()=>{
         await this.localStream.close({type:"video"});
         this.currentStep = 7;
         this.restore();
        },5000)
        
      }catch{
        console.warn("摄像头预览出错");
        (this.testUnites.find(e=>e.id==6)).notError=false; 
        this.currentStep =7;
        this.restore();
      }
      
    },
    restore() {
      setTimeout(() => {
        this.currentStep = 0;
        this.testing = false;
        this.bitrateData= {
          columns: ["index", "发送视频码率", "发送音频码率"],
          rows: [
              {
                index: 0,
                发送视频码率: 0,
                发送音频码率: 0,
              },
            ],
        };
        this.packetsData={
          columns: ["index", "发送视频丢包率", "发送音频丢包率"],
          rows: [
            {
              index: 0,
              发送视频丢包率: 0,
              发送音频丢包率: 0,
            },
          ],
        };
        this.inputVolume=0;
        this.subscribed=false;
        for (let profile of this.profiles) {
          profile.status='pending';
        }
      }, 10000);
    },
  },
};
</script>
