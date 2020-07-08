<template>
    <div class="base-timer">
        <span class="base-timer__label">{{ formattedTimeLeft }}</span>
        <svg class="base-timer__svg" viewBox="0 0 300 25"  xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <path
                        class="base-timer__path-elapsed"
                        d="
            M 300, 10
            L 0, 10
          "
                ></path>
                <path
                        :stroke-dasharray="circleDasharray"
                        class="base-timer__path-remaining"
                        :class="remainingPathColor"
                        d="

            M 300, 10
            L 0, 10
          "
                ></path>
            </g>
        </svg>
    </div>
</template>

<script>
    const FULL_DASH_ARRAY = 300;
    const WARNING_THRESHOLD = 20;
    const ALERT_THRESHOLD = 10;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = 300;

    export default {
        data() {
            return {
                timePassed: 0,
                timerInterval: null
            };
        },

        computed: {
            circleDasharray() {
                return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 300`;
            },

            formattedTimeLeft() {
                const timeLeft = this.timeLeft;
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;

                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }

                return `${minutes}:${seconds}`;
            },

            timeLeft() {
                return TIME_LIMIT - this.timePassed;
            },

            timeFraction() {
                const rawTimeFraction = this.timeLeft / TIME_LIMIT;
                return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
            },

            remainingPathColor() {
                const { alert, warning, info } = COLOR_CODES;

                if (this.timeLeft <= alert.threshold) {
                    return alert.color;
                } else if (this.timeLeft <= warning.threshold) {
                    return warning.color;
                } else {
                    return info.color;
                }
            }
        },

        watch: {
            timeLeft(newValue) {
                if (newValue === 0) {
                    this.onTimesUp();
                }
            }
        },
        mounted() {
            this.startTimer();
        },
        methods: {
            onTimesUp() {
                clearInterval(this.timerInterval);
                this.$emit('time-out')
                console.log('время вышло')
            },
            stopTimer(){
                clearInterval(this.timerInterval)
            },
            startTimer() {
                this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
            }
        }
    };
</script>

<style scoped lang="scss">
    svg{

    }
    .base-timer {
        /*position: relative;*/
        width: 100%;
        height: 50px;

        &__svg {
            transform: scaleX(-1);
        }

        &__circle {
            fill: none;
            stroke: none;
        }

        &__path-elapsed {
            stroke-width: 5px;
            stroke: grey;
        }

        &__path-remaining {
            stroke-width: 5px;
            stroke-linecap: round;
            /* transform: rotate(90deg); */
            /* transform-origin: center; */
            transition: 1s linear all;
            fill-rule: nonzero;
            stroke: currentColor;

            &.green {
                color: rgb(65, 184, 131);
            }

            &.orange {
                color: orange;
            }

            &.red {
                color: red;
            }
        }

        &__label {
            /*position: absolute;*/
            /*width: 300px;*/
            /*height: 300px;*/
            /*top: 0;*/
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
    }
</style>
