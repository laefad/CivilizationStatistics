<script lang="ts" setup>
enum StatusColor {
    Loading = 'yellow',
    Online = 'green',
    Offline = 'red'
}

const { data, loading } = storeToRefs(useMinecraftStatusStore())

const creeperColor = computed(() =>
    loading.value
        ? StatusColor.Loading
        : data.value?.online
            ? StatusColor.Online
            : StatusColor.Offline
)

</script>

<template>
    <svg width="109.2933mm" height="18.7066mm" version="1.1" id="MCCB_Logo_Primary" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1639.4 280.6"
        style="enable-background:new 0 0 1639.4 280.6;" xml:space="preserve">
        <g>
            <path d="M1607.7,101.6l29.6-49L1620.9,0H494.1l-5.3,38.4L478.4,0H215.8l-9,36.2H185l-5.2,20L150.8,0H65.2L0,209.3l52,71.3l85.5,0l10.5-39.5h34.5l23.1,39.5h263.8l6.3-45.9l14.6,45.9h881.4l35.7-73.9h32.3l30-58.7l32,132.6h88.7l49.1-71.4L1607.7,101.6zM846.2,151.3l0.1-25h75.8l0.8,25H846.2z" />
            <polygon class="MCCB-0" points="59.4,266.1 16.1,206.7 86,206.7 125.6,266.1" />
            <polygon class="MCCB-0" points="342.2,206.7 272.3,206.7 302.2,266.1 368.4,266.1" />
            <polygon class="MCCB-0" points="365.5,206.7 390.5,266.1 456.7,266.1 435.4,206.7" />
            <polygon class="MCCB-0" points="575.2,206.7 589.2,266.1 743.7,266.1 738.2,206.7" />
            <polygon class="MCCB-0" points="924.6,206.7 920.3,266.1 765.8,266.1 761.5,206.7" />
            <polygon class="MCCB-0" points="947.9,206.7 1017.8,206.7 1008.6,266.1 942.4,266.1" />
            <polygon class="MCCB-0" points="1041.1,206.7 1030.7,266.1 1096.9,266.1 1111,206.7" />
            <polygon class="MCCB-0" points="1134.3,206.7 1119,266.1 1185.2,266.1 1204.1,206.7" />
            <polygon class="MCCB-0" points="1227.4,206.7 1207.3,266.1 1273.5,266.1 1297.3,206.7" />
            <polygon class="MCCB-0" points="1320.6,206.7 1295.6,266.1 1361.8,266.1 1390.5,206.7" />
            <polygon class="MCCB-0" points="1553.6,206.7 1516.4,266.1 1582.6,266.1 1623.5,206.7" />
            <polygon class="MCCB-0" points="482,206.7 500.9,266.1 567.1,266.1 551.9,206.7" />
            <polygon class="MCCB-0" points="179.1,206.7 249,206.7 280.1,266.1 213.9,266.1" />
            <g>
                <g>
                    <path class="MCCB-1" d="M199.2,126.3h-22.6l-10.2,39.5h-45.9l10.9-39.5h-22.6L86,206.7H16.1L75.9,14.6h64.8l-10.3,36.2h21.9l-10.3,37.2h44.5l9.6-37.2h21.9l9-36.2H292l-43,192.1h-69.9L199.2,126.3z" />
                    <path class="MCCB-1" d="M313.6,14.6h64.8l-36.3,192.1h-69.9L313.6,14.6z" />
                    <path class="MCCB-1" d="M594.6,14.6h151.3l-1.4,36.2h-87.7l-2.8,37.2h89l-1.5,38.4H651l-2.9,39.5h91.7l-1.6,40.8H575.2L594.6,14.6z" />
                    <path class="MCCB-1" d="M767.4,14.6h151.3l1.1,36.2h-87.7l-0.5,115.1h91.7l1.3,40.8H761.5L767.4,14.6z" />
                    <path class="MCCB-1" d="M1035.1,126.3h-22.6l5.3,80.4h-69.9l-7.6-192.1l151.3,0l7.4,73.4h-22.3l1.8,19h22.4l10.1,99.7h-69.9L1035.1,126.3z M1007.5,50.7l2.5,37.2h22.3l-2.8-37.2H1007.5z" />
                    <path class="MCCB-1" d="M1286.1,14.6h151.3l8.7,36.2h-87.7l7.7,37.2h89l9.3,38.4h-90.4l16.6,80.4h-69.9L1286.1,14.6z" />
                    <path class="MCCB-1" d="M1511.8,50.7H1468l-9-36.2h151.3l11.3,36.2h-43.9l45.9,156h-69.9L1511.8,50.7z" />
                    <path class="MCCB-1" d="M490.2,145.9h-22.8l5.6-38.9h-22.4l-15.3,99.7h-69.9l34.6-192.1h64.8l-5.6,36.2h21.9l-5.4,37.2h22.3l10-73.4h64.8l-21.1,192.1H482L490.2,145.9z" />
                </g>
                <path
                    :fill="creeperColor"
                    d="M1264.4,14.6h-151.3l21.1,192.1h69.9l-8.3-60.8h22.8l8.8,60.8h69.9L1264.4,14.6z M1213.5,84.8h11.1l5.3,35h-15L1213,107h-22.4l1.7,12.9h-15l-4.6-35h11.1l-1.3-9.4h-25.8l-3.1-24.7h29.2l2.9,21.6h22.1l-3.1-21.6h29.2l3.9,24.7h-25.8L1213.5,84.8z"
                />
            </g>
        </g>
    </svg>
</template>

<style lang="sass" scoped>
.MCCB-0
    fill: #3D3938
.MCCB-1
    fill: #D0C5C0
</style>
