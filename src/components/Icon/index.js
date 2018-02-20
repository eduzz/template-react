import React from 'react';

const icons = {
    'airplane': {
        paths:[
            {
                d: 'M15.738 3.207c-.006-.033-.017-.06-.034-.087l-.002-.002c-.016-.025-.035-.046-.06-.064l-.015-.01-.062-.03-.043-.007L15.49 3h-.002l-.024.002h-.014l-.02.004-14.983 3c-.106.02-.187.104-.203.21-.015.103.04.206.135.255l4.29 2.194.754 4.047V12.78l.005.03c.005.023.014.045.027.066l.006.013.003.002.01.013.04.04.007.006.012.007.05.024.02.01c.023.006.047.01.072.01H5.695c.07 0 .136-.03.183-.08l2.86-1.845 2.993 1.885c.043.026.092.04.14.04.028 0 .056-.004.082-.013.075-.023.134-.08.16-.15L15.71 3.38c.023-.038.037-.082.037-.13l-.01-.043zm-2.99 1.68L6.558 9.3l-.028.023-.01.01-.015.017-.012.018-.024.047-.005.01-.002.002-.71 2.234L5.19 8.64l7.558-3.75zm-6.594 7.255l.703-2.25 1.41.886-2.113 1.364z',
            },
        ],
    },
    'cart-solid': {
        paths:[
            {
                d: 'M16 11.31V3.034H1.867V.276A.271.271 0 0 0 1.6 0H.267A.271.271 0 0 0 0 .276c0 .152.12.276.267.276h1.066v12.69c0 .152.12.275.267.275h1.875a1.39 1.39 0 0 0-.542 1.104c0 .76.598 1.379 1.334 1.379.735 0 1.333-.619 1.333-1.38a1.39 1.39 0 0 0-.542-1.103h5.617a1.39 1.39 0 0 0-.542 1.104c0 .76.598 1.379 1.334 1.379.735 0 1.333-.619 1.333-1.38a1.39 1.39 0 0 0-.542-1.103h1.609a.271.271 0 0 0 .266-.276.271.271 0 0 0-.266-.275h-12V11.31H16',
            },
        ],
    },
    'price-tag': {
        paths:[
            {
                d: 'M15.655.34a.27.27 0 0 0-.377 0l-.988.971H8.08L.277 9.052a.911.911 0 0 0 0 1.309l5.457 5.368A.943.943 0 0 0 6.4 16a.944.944 0 0 0 .667-.274l7.6-7.677V1.682l.99-.972a.259.259 0 0 0 0-.37zm-5.389 8.803a.27.27 0 0 1-.377 0 .259.259 0 0 1 0-.37c.664-.653.72-1.678.174-2.397L7.677 8.723l.203 1.597c.056.442-.075.894-.36 1.24a1.58 1.58 0 0 1-1.097.575 2.419 2.419 0 0 1-1.698-.509l-.304.3a.27.27 0 0 1-.377 0 .259.259 0 0 1 0-.371l.305-.3a2.334 2.334 0 0 1 .177-3.142.27.27 0 0 1 .377 0 .26.26 0 0 1 0 .37 1.815 1.815 0 0 0-.174 2.397l2.386-2.346-.203-1.598a1.632 1.632 0 0 1 .36-1.239 1.58 1.58 0 0 1 1.097-.575 2.419 2.419 0 0 1 1.698.508l.2-.196a.27.27 0 0 1 .376 0 .259.259 0 0 1 0 .37l-.2.197a2.335 2.335 0 0 1-.177 3.142zm1.467-3.635A1.324 1.324 0 0 1 10.4 4.197c0-.723.598-1.312 1.333-1.312.736 0 1.334.589 1.334 1.312 0 .723-.598 1.311-1.334 1.311z M8.413 5.644c-.284.024-.542.16-.727.384a1.11 1.11 0 0 0-.244.843l.151 1.192 2.093-2.058a1.89 1.89 0 0 0-1.273-.36M7.2 9.193L5.106 11.25a1.9 1.9 0 0 0 1.272.361 1.05 1.05 0 0 0 .727-.383c.193-.235.283-.543.245-.844l-.152-1.192',
            },
        ],
    },
    'chat-rounded': {
        paths:[
            {
                d: 'M14.487 11.948c.82-1.146 1.25-2.473 1.25-3.843C15.738 4.187 12.208 1 7.87 1 3.53 1 0 4.187 0 8.105c0 3.918 3.53 7.106 7.87 7.106 1.117 0 2.196-.207 3.21-.617 1.785 1.033 4.253 1.39 4.36 1.404.01.002.023.003.035.003.1 0 .19-.056.235-.146.05-.1.03-.223-.05-.303-.602-.604-1.018-1.882-1.173-3.602',
            },
        ],
    },
    'color-pallete': {
        paths:[
            {
                d: 'M8 0C3.59 0 0 3.59 0 8s3.59 8 8 8c1.944 0 3.01-.313 3.352-.984.407-.796-.316-1.797-1.015-2.765-.57-.78-1.157-1.6-.82-1.92.437-.41 1.318-.47 2.12-.47.237 0 .477.01.716.01.243.01.485.01.723.01C14.098 9.88 16 9.88 16 8c0-4.41-3.59-8-8-8zm0 1.143c.63 0 1.143.513 1.143 1.143S8.63 3.43 8 3.43s-1.143-.514-1.143-1.144c0-.63.513-1.143 1.143-1.143zM1.143 8c0-.63.513-1.143 1.143-1.143S3.43 7.37 3.43 8s-.514 1.143-1.144 1.143c-.63 0-1.143-.513-1.143-1.143zm3.094 4.237c-.216.215-.503.334-.808.334-.31 0-.6-.11-.81-.33-.45-.44-.45-1.17 0-1.61.21-.214.5-.332.81-.332.3 0 .59.118.8.334.442.447.442 1.17 0 1.618zm0-8c-.216.216-.503.334-.808.334-.31 0-.6-.11-.81-.33-.45-.44-.45-1.17 0-1.61.21-.213.5-.332.81-.332.3 0 .59.12.8.335.442.446.442 1.17 0 1.617zM8 14.857c-.63 0-1.143-.513-1.143-1.143S7.37 12.57 8 12.57s1.143.514 1.143 1.144c0 .63-.513 1.143-1.143 1.143zm1.06-6.45c-.098.148-.26.24-.438.24-.574.003-.868.09-.944.164-.268.26-.254.59-.194.82.04.16.007.33-.092.46-.1.13-.255.208-.416.208-.076 0-.15-.017-.22-.05-.712-.32-1.124-1.06-1.028-1.834.095-.77.72-1.412 1.484-1.526.79-.118 1.566.31 1.886 1.03.072.16.057.348-.04.498zm2.37-3.836c-.307 0-.594-.11-.81-.33-.446-.44-.446-1.17 0-1.61.216-.213.503-.332.81-.332.304 0 .59.12.807.335.446.446.446 1.17 0 1.617-.216.217-.503.335-.808.335zM13.713 8c-.63 0-1.143-.513-1.143-1.143s.514-1.143 1.144-1.143c.63 0 1.143.513 1.143 1.143S14.344 8 13.714 8z',
            },
        ],
    },
    'clone': {
        paths:[
            {
                d: 'M11 2h3v11h-1V3H3v10h11v1H2v-2H0V0h11v2zm-1 0V1H1v10h1V2h8z',
            },
        ],
    },
    'close': {
        paths:[
            {
                d:    'M44.8 9.4l-4.2-4.2L25 20.8 9.4 5.2 5.2 9.4 20.8 25 5.2 40.6l4.2 4.2L25 29.2l15.6 15.6 4.2-4.2L29.2 25',
            },
        ],
    },
    'direction-sign': {
        paths:[
            {
                d: 'M13.44 5.6l2.367-2.158c.067-.06.106-.15.106-.242s-.04-.18-.105-.24L13.44.8H8.368V.267C8.368.12 8.25 0 8.105 0c-.145 0-.263.12-.263.267V.8H3.21c-.493 0-.894.406-.894.906v2.988c0 .5.4.906.894.906h4.632v.533h-4.37l-2.366 2.16c-.068.06-.106.15-.106.24 0 .092.038.18.106.24l2.367 2.16h4.37v4.8c0 .148.117.267.262.267.146 0 .263-.12.263-.267v-4.8h5.423c.493 0 .894-.406.894-.905v-2.99c0-.5-.4-.905-.893-.905H8.37V5.6h5.072',
            },
        ],
    },
    'disk-save': {
        paths:[
            {
                d: 'M9 1.633h2v3.265H9z M13.138 0H0v16h16V2.804L13.138 0zM3.333.653H12v5.225H3.333V.653zM2.667 8.49H13v6.857H2.667V8.49z M4.333 10.449h2.334A.33.33 0 0 0 7 10.122a.33.33 0 0 0-.333-.326H4.333a.33.33 0 0 0-.333.326.33.33 0 0 0 .333.327m0 1.306h3.334A.33.33 0 0 0 8 11.43a.33.33 0 0 0-.333-.327H4.333A.33.33 0 0 0 4 11.43c0 .18.149.326.333.326m4.334-.001c.09 0 .173-.036.236-.095A.34.34 0 0 0 9 11.43a.34.34 0 0 0-.097-.232.35.35 0 0 0-.47 0 .32.32 0 0 0-.003.463.347.347 0 0 0 .237.095',
            },
        ],
    },
    'delete': {
        paths:[
            {
                d: 'M12.2067025 10.4780542l1.4248396 1.4850785c-.7222337.606026-1.0833505.909039-1.0833505.909039l-1.274242-1.3281141L10 13c-.66666667-.6666667-1-1-1-1l1.2932975-1.4780542-1.42483957-1.48507853 1.08335044-.90903895 1.27424203 1.32811407L12.5 8l1 1-1.2932975 1.4780542zM1 1h11v6h-1V2H2v12h8v1H1V1z',
            },
        ],
    },
    'exit': {
        paths:[
            {
                d:     'M14.978 6.87c.03.072.03.152 0 .223-.014.036-.035.068-.06.095l-3.397 3.49c-.054.057-.127.086-.2.086-.072 0-.144-.03-.2-.086-.11-.113-.11-.297 0-.41l2.914-2.995h-6.11c-.156 0-.282-.13-.282-.29 0-.162.126-.292.283-.292h6.11L11.12 3.698c-.11-.114-.11-.298 0-.412.11-.114.29-.114.4 0l3.397 3.49c.026.028.047.06.06.096zM9.906 8.437c.156 0 .283.13.283.29v4.947c0 .16-.128.29-.284.29H6.792v1.746c0 .092-.043.18-.116.234-.05.037-.107.056-.167.056-.03 0-.058-.005-.086-.014L.197 13.95l-.013-.007-.03-.016-.056-.038-.025-.027-.038-.057-.015-.03c-.012-.033-.02-.067-.02-.103V.29C0 .256.008.22.02.19L.026.17C.04.143.056.116.078.093L.093.078.116.056.14.046C.162.032.186.022.213.016l.044-.01L.283 0h9.623c.156 0 .283.13.283.29v4.946c0 .16-.128.29-.284.29-.157 0-.283-.13-.283-.29V.582H2.106l4.49 1.468c.117.038.196.15.196.277v11.055h2.83V8.727c0-.16.127-.29.284-.29z',
            },
        ],
    },
    'edit': {
        paths:[
            {
                d: 'M1 1h11v6h-1V2H2v12h8v1H1V1zm13 7l-3.5 4-1.5.5.5-1.5s1.1666667-1.33333333 3.5-4l1 1z',
            },
        ],
    },
    'facebook': {
        paths:[
            {
                d: 'M11 5.18H8.616V3.52c0-.623.39-.77.663-.77h1.682V.01L8.645 0C6.073 0 5.487 2.045 5.487 3.353V5.18H4v2.826h1.487V16h3.13V8.006h2.11L11 5.18z',
            },
        ],
    },
    'filter': {
        paths:[
            {
                d: 'M8 .005H.575l5.505 7.73v7.89l.02.348h.32l.146-.005 3.354-3.442v-4.79l5.505-7.73c-.925-.012-3.45 0-7.425 0z',
            },
        ],
    },
    'home': {
        paths:[
            {
                d:     'M14.923 6.817L12.586 4.57V1.75h-1.93v.962L8 .16 1.077 6.816c-.098.094-.103.252-.013.353.09.1.244.107.342.013L2.448 6.18V15H6.31V8.984c0-.267.21-.484.468-.484h2.444c.258 0 .468.217.468.484V15h3.862V6.18l1.042 1.003c.047.045.106.067.165.067.064 0 .128-.027.175-.08.09-.1.086-.26-.012-.353',
            },
        ],
    },
    'gears': {
        paths:[
            {
                d:   'M15.176 6.222H13.68c-.24 0-.44-.132-.532-.354-.092-.223-.045-.457.125-.627l1.058-1.057c.157-.156.243-.363.243-.583 0-.22-.086-.427-.242-.582l-1.348-1.35c-.31-.31-.853-.31-1.165 0L10.76 2.73c-.142.14-.296.17-.4.17-.15 0-.297-.06-.406-.16-.08-.076-.176-.21-.176-.417V.825C9.778.37 9.408 0 8.954 0H7.046c-.454 0-.824.37-.824.824V2.32c0 .36-.295.577-.58.577-.106 0-.26-.03-.4-.17L4.18 1.67c-.31-.313-.853-.312-1.164 0l-1.35 1.348c-.155.155-.24.362-.24.582 0 .22.085.427.24.583L2.73 5.24c.17.17.216.405.124.628-.092.222-.29.354-.53.354H.823c-.455 0-.824.37-.824.824v1.908c0 .454.37.824.824.824H2.32c.24 0 .44.132.532.354.092.223.045.457-.125.627L1.67 11.816c-.157.156-.243.363-.243.583 0 .22.086.427.242.582l1.348 1.35c.31.31.853.31 1.165 0l1.058-1.06c.142-.14.296-.17.4-.17.287 0 .582.217.582.577v1.496c0 .454.37.824.824.824h1.908c.454 0 .824-.37.824-.824V13.68c0-.36.295-.577.58-.577.106 0 .26.03.4.17l1.06 1.058c.31.313.853.312 1.164 0l1.35-1.348c.155-.155.24-.362.24-.582 0-.22-.085-.427-.24-.583l-1.06-1.058c-.17-.17-.216-.405-.124-.628.093-.222.29-.354.53-.354h1.498c.455 0 .824-.37.824-.824V7.046c0-.454-.37-.824-.824-.824zM10.074 8c0 1.143-.93 2.074-2.074 2.074-1.143 0-2.074-.93-2.074-2.074 0-1.143.93-2.074 2.074-2.074 1.143 0 2.074.93 2.074 2.074z',
            },
        ],
    },
    'help': {
        paths:[
            {
                d:     'M14.337 1H3.163c-.366 0-.663.303-.663.674v1.868h8.587c.64 0 1.163.53 1.163 1.183v6.444h.396L15 13.562V1.673c0-.37-.297-.673-.663-.673 M11.087 4.05H.663c-.366 0-.663.303-.663.675V15.85l2.353-2.392h8.734c.366 0 .663-.303.663-.675V4.725c0-.372-.297-.674-.663-.674zM2.75 6.594h3c.138 0 .25.114.25.254s-.112.255-.25.255h-3c-.138 0-.25-.114-.25-.255 0-.14.112-.254.25-.254zM9 10.66H2.75c-.138 0-.25-.113-.25-.253s.112-.254.25-.254H9c.138 0 .25.113.25.254 0 .14-.112.254-.25.254zm0-1.78H2.75c-.138 0-.25-.113-.25-.253s.112-.254.25-.254H9c.138 0 .25.114.25.254s-.112.254-.25.254z',
            },
        ],
    },
    'letter': {
        paths:[
            {
                d: 'M16 12.676l-5.47-5.04L16 2.37v10.306zM0 2.37l5.472 5.267L0 12.677V2.368zM.37 2h15.26l-5.6 5.392c-.032.013-.127.107-.14.134L8.316 9.044c-.177.157-.453.158-.622.007L6.108 7.526c-.012-.026-.105-.12-.138-.132L.37 2zm9.782 6l5.43 5H.418l5.43-5 1.474 1.418c.19.17.432.254.675.254.246 0 .494-.086.688-.26L10.152 8z',
            },
        ],
    },
    'library': {
        paths:[
            {
                d: 'M2 13h13v3H2v-3zM2 1h3v11H2V1zm4 0h3v11H6V1zm3 3.24L11.784 3l3.8 8.534-2.784 1.24L9 4.24z',
            },
        ],
    },
    'linkedin': {
        paths:[
            {
                d: 'M16 2.54c-.588.26-1.22.437-1.885.516.678-.406 1.198-1.05 1.443-1.816-.634.376-1.337.65-2.085.797C12.875 1.4 12.023 1 11.078 1 9.265 1 7.795 2.47 7.795 4.282c0 .257.03.507.085.748-2.728-.137-5.147-1.444-6.766-3.43C.83 2.086.67 2.65.67 3.25c0 1.14.58 2.144 1.46 2.733-.538-.018-1.044-.165-1.487-.41v.04c0 1.59 1.13 2.916 2.633 3.218-.275.076-.565.116-.865.116-.21 0-.416-.02-.617-.06.418 1.305 1.63 2.254 3.067 2.28-1.124.88-2.54 1.406-4.077 1.406-.265 0-.526-.016-.783-.047C1.453 13.457 3.178 14 5.032 14c6.038 0 9.34-5 9.34-9.338 0-.142-.003-.284-.01-.425.642-.462 1.198-1.04 1.638-1.698z',
            },
        ],
    },
    'mailbox': {
        paths:[
            {
                d: 'M12.78 3.862H8.456V2.76H12l-1.023-1.38L12 0H7.91v3.862H2.726l-.09.003c-.016 0-.03-.003-.046-.003C1.163 3.862 0 5.038 0 6.482v6.208h6.273V16H9v-3.31h6V6.106c0-1.237-.995-2.244-2.22-2.244zm-8.144 8.276H.546V6.483c0-1.14.917-2.07 2.045-2.07.03 0 .055.004.083.005l.038.002c.136.008.267.03.394.062.062.016.122.036.18.057l.012.003c.055.02.11.043.162.07.007.002.014.005.02.01.05.023.1.05.146.077.01.006.02.012.03.02.043.025.086.054.127.083.013.01.025.02.038.028.038.03.075.06.11.09l.04.038c.034.03.066.062.098.095l.04.046c.03.03.058.063.084.097.015.018.028.037.04.055.026.033.05.067.073.1l.038.065c.02.034.042.068.06.103l.035.073c.016.034.033.07.047.104l.03.083.036.102c.01.032.017.065.025.097.007.03.017.063.023.096.008.04.013.08.02.122.002.026.008.052.01.078.007.068.01.137.01.207v5.655zm3.82.828h-.547c-.15 0-.274.123-.274.275 0 .154.123.277.273.277h.545v.276H7.91c-.15 0-.274.123-.274.276 0 .152.123.275.273.275h.545v.276H7.91c-.15 0-.274.124-.274.277 0 .152.123.275.273.275h.545v.276H6.818V12.69h1.637v.276zM8.18 8.828c-.752 0-1.364-.62-1.364-1.38 0-.666.47-1.223 1.09-1.35v1.35c0 .153.123.276.274.276.15 0 .273-.123.273-.276v-1.35c.62.127 1.09.684 1.09 1.35 0 .76-.61 1.38-1.363 1.38z',
            },
        ],
    },
    'package': {
        paths:[
            {
                d:  'M0 16h16V4.8H0V16zm6.055-4.345c-.052.052-.12.078-.188.078-.07 0-.137-.026-.19-.078-.103-.104-.103-.273 0-.377l.8-.8c.026-.024.055-.044.088-.057.065-.026.138-.026.204 0 .03.014.06.034.085.058l.8.8c.104.104.104.273 0 .377-.052.052-.12.078-.188.078-.07 0-.137-.026-.19-.078l-.344-.345v1.757c0 .147-.12.266-.266.266-.148 0-.267-.12-.267-.266V11.31l-.345.345zm4.078 2.745H5.867c-.148 0-.267-.12-.267-.267 0-.147.12-.266.267-.266h4.266c.148 0 .267.12.267.266 0 .148-.12.267-.267.267zm.19-2.745c-.053.052-.12.078-.19.078-.068 0-.136-.026-.188-.078L9.6 11.31v1.757c0 .147-.12.266-.267.266-.147 0-.266-.12-.266-.266V11.31l-.345.345c-.052.052-.12.078-.19.078-.067 0-.135-.026-.187-.078-.104-.104-.104-.273 0-.377l.8-.8c.024-.024.054-.044.086-.057.067-.026.14-.026.205 0 .033.014.062.034.087.058l.8.8c.104.104.104.273 0 .377zM9.6 7.733H6.4c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8h3.2c.44 0 .8.36.8.8 0 .44-.36.8-.8.8z M13.214 0H8.267v4.267h7.614L13.215 0M7.733 0H2.786L.12 4.267h7.613V0 Z',
            },
        ],
    },
    'paper': {
        paths:[
            {
                d:    'M7.58625532,0 L0,0 L0,14 L11,14 L11,3.4034 L7.58625532,0 L7.58625532,0 Z M2.57446809,3.26666667 L4.91489362,3.26666667 C5.04408511,3.26666667 5.14893617,3.37096667 5.14893617,3.5 C5.14893617,3.62903333 5.04408511,3.73333333 4.91489362,3.73333333 L2.57446809,3.73333333 C2.4452766,3.73333333 2.34042553,3.62903333 2.34042553,3.5 C2.34042553,3.37096667 2.4452766,3.26666667 2.57446809,3.26666667 L2.57446809,3.26666667 Z M8.42553191,11.2 L2.57446809,11.2 C2.4452766,11.2 2.34042553,11.0954667 2.34042553,10.9666667 C2.34042553,10.8376333 2.4452766,10.7333333 2.57446809,10.7333333 L8.42553191,10.7333333 C8.5547234,10.7333333 8.65957447,10.8376333 8.65957447,10.9666667 C8.65957447,11.0954667 8.5547234,11.2 8.42553191,11.2 L8.42553191,11.2 Z M8.42553191,9.33333333 L2.57446809,9.33333333 C2.4452766,9.33333333 2.34042553,9.22903333 2.34042553,9.1 C2.34042553,8.97096667 2.4452766,8.86666667 2.57446809,8.86666667 L8.42553191,8.86666667 C8.5547234,8.86666667 8.65957447,8.97096667 8.65957447,9.1 C8.65957447,9.22903333 8.5547234,9.33333333 8.42553191,9.33333333 L8.42553191,9.33333333 Z M8.42553191,7.46666667 L2.57446809,7.46666667 C2.4452766,7.46666667 2.34042553,7.36236667 2.34042553,7.23333333 C2.34042553,7.1043 2.4452766,7 2.57446809,7 L8.42553191,7 C8.5547234,7 8.65957447,7.1043 8.65957447,7.23333333 C8.65957447,7.36236667 8.5547234,7.46666667 8.42553191,7.46666667 L8.42553191,7.46666667 Z M8.42553191,5.6 L2.57446809,5.6 C2.4452766,5.6 2.34042553,5.49546667 2.34042553,5.36666667 C2.34042553,5.23763333 2.4452766,5.13333333 2.57446809,5.13333333 L8.42553191,5.13333333 C8.5547234,5.13333333 8.65957447,5.23763333 8.65957447,5.36666667 C8.65957447,5.49546667 8.5547234,5.6 8.42553191,5.6 L8.42553191,5.6 Z M7.25531915,3.73333333 L7.25531915,0.466666667 L10.5319149,3.73333333 L7.25531915,3.73333333 L7.25531915,3.73333333 Z',
            },
        ],
    },
    'play': {
        paths:[
            {
                d:     'M13.833 7.686L2.607.066c-.118-.08-.273-.088-.4-.023C2.08.11 2 .24 2 .38v15.24c0 .14.08.27.207.337.057.03.12.043.18.043.077 0 .154-.023.22-.067l11.226-7.62c.104-.07.167-.188.167-.313s-.063-.243-.167-.314',
            },
        ],
    },
    'play-outline': {
        paths:[
            {
                d:     'M11.613 7.808l-4.945-3.37v6.742l4.945-3.372zm-5.46 3.86V3.95c0-.207.232-.33.403-.213l5.66 3.86c.15.1.15.322 0 .424l-5.66 3.86c-.17.12-.402-.003-.402-.21z M15.467 8C15.467 3.876 12.124.533 8 .533S.533 3.876.533 8 3.876 15.467 8 15.467 15.467 12.124 15.467 8zM16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z',
            },
        ],
    },
    'play-rounded': {
        paths:[
            {
                d: 'M8 0C3.59 0 0 3.59 0 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm2.857 8.558L6.383 11.14c-.076.046-.163.07-.25.07-.278 0-.503-.227-.503-.504V5.54c0-.277.225-.503.502-.503.088 0 .175.023.25.067l4.475 2.584c.158.09.252.253.252.435s-.095.344-.253.435z',
            },
        ],
    },
    'replay': {
        paths:[
            {
                d:   'M8 2.2c-.3 0-.6 0-.9.1l.6-.9L6.4.6l-1.8 3L7 6l1-1-1.1-1.1c.4-.1.7-.1 1.1-.1 2.9 0 5.2 2.4 5.2 5.2 0 2.9-2.4 5.2-5.2 5.2-2.9 0-5.2-2.4-5.2-5.2 0-.8.2-1.7.6-2.4L2 5.9c-.5 1-.8 2-.8 3.1 0 3.7 3 6.8 6.8 6.8 3.7 0 6.8-3 6.8-6.8 0-3.7-3.1-6.8-6.8-6.8z',
            },
        ],
    },
    'showcase': {
        paths:[
            {
                d: 'M14.667 1.756V.773c0-.426-.347-.773-.773-.773H2.106c-.426 0-.773.347-.773.773v.983L0 3.09v1.577c0 .045.003.09.007.133H0V16h1.6v-.8h12.8v.8H16V4.8h-.007c.004-.044.007-.088.007-.133V3.09l-1.333-1.334zM.533 15.2h.534v.267H.533V15.2zm.534-3.733H.533v-5.67c.155.128.336.223.534.28v5.39zm7.2-6.934v-4h1.6v1.334l.266 1.36v1.44c0 .514-.418.933-.933.933-.515 0-.933-.42-.933-.933v-.134zm-5.067 0v-1.26L4 1.942V.534h1.6V1.84l-.26 1.308L5.334 4h-.002v.667c0 .514-.418.933-.933.933h-.267c-.514 0-.933-.42-.933-.933v-.134zM1.867 12H2.4v2.667h-.533V12zm1.066 0h.534v2.667h-.534V12zM4 12h.533v2.667H4V12zm.533-4c-.147 0-.266.12-.266.267v1.49l-1.49-1.49.112-.112c.438-.44 1.022-.68 1.643-.68.622 0 1.206.24 1.645.68l.112.112-1.49 1.49v-1.49C4.8 8.12 4.68 8 4.533 8zm.534 4H5.6v2.667h-.533V12zm1.066 0h.534v2.667h-.534V12zM7.2 12h.533v2.667H7.2V12zm1.067 0H8.8v2.667h-.533V12zm1.066 0h.534v2.667h-.534V12zm1.067 0h.533v2.667H10.4V12zm0-.533c-.294 0-.533-.24-.533-.534 0-.294.24-.533.533-.533.294 0 .533.24.533.533 0 .294-.24.534-.533.534zm1.067.533H12v2.667h-.533V12zm.533-.533c-.294 0-.533-.24-.533-.534 0-.294.24-.533.533-.533.294 0 .533.24.533.533 0 .294-.24.534-.533.534zm.533.533h.534v2.667h-.534V12zm1.067 0h.533v2.667H13.6V12zm.8-.533h-1.482c.092-.158.15-.338.15-.534 0-.55-.42-.998-.956-1.055.096-.16.155-.345.155-.545 0-.588-.48-1.066-1.067-1.066-.588 0-1.067.478-1.067 1.066 0 .2.06.385.155.545-.535.057-.955.505-.955 1.055 0 .196.057.376.15.534h-4.15v-.8H6.4c.147 0 .267-.12.267-.267 0-.147-.12-.267-.267-.267H5.177l1.867-1.866-.49-.49c-.54-.54-1.257-.836-2.02-.836-.764 0-1.482.298-2.022.838l-.49.49 1.868 1.865H2.667c-.148 0-.267.12-.267.267 0 .147.12.267.267.267h1.066v.8H1.6V6.133h.133c.496 0 .935-.248 1.2-.626.266.378.704.626 1.2.626H4.4c.496 0 .934-.248 1.2-.626.266.378.704.626 1.2.626s.934-.248 1.2-.626c.266.378.704.626 1.2.626s.934-.248 1.2-.626c.266.378.704.626 1.2.626h.267c.496 0 .934-.248 1.2-.626.265.378.704.626 1.2.626h.133v5.334zm.533 3.733h.534v.267h-.534V15.2zm.534-3.733h-.534v-5.39c.198-.057.38-.152.534-.28v5.67zm0-7.734v.934c0 .102-.02.2-.052.29l-.006.02c-.016.042-.034.083-.054.12V5.1c-.06.112-.14.21-.237.288-.005.003-.01.006-.013.01-.133.103-.294.17-.47.19l-.107.012h-.263c-.515 0-.934-.42-.934-.933v-1.54l-.8-1.334V.533h1.36c.133 0 .24.108.24.24v1.204l1.334 1.333v.423z',
            },
        ],
    },
    'students': {
        paths:[
            {
                d: 'M14.67 12.697c.82.42 1.33 1.262 1.33 2.2V16H3.733v-1.156c0-.9.48-1.728 1.254-2.16l2.38-1.327c.226-.126.366-.37.366-.633v-.902c-.178-.24-.69-.985-.934-1.974-.253-.207-.4-.516-.4-.848V5.91c0-.264.096-.518.267-.717v-1.45c-.015-.15-.074-1.044.558-1.78C7.772 1.323 8.66 1 9.867 1c1.205 0 2.094.324 2.642.963.63.736.572 1.63.557 1.78v1.45c.17.2.266.453.266.716V7c0 .43-.244.81-.62.986-.193.573-.458 1.105-.788 1.582-.066.096-.13.183-.192.26v.92c0 .276.15.523.39.646l2.547 1.303zm-9.875-.372c-.9.503-1.462 1.468-1.462 2.52V16H0v-1.036c0-.79.422-1.518 1.102-1.897l1.774-1.14c.198-.11.312-.306.312-.52v-.75c-.21-.224-.752-.865-.972-1.713-.22-.185-.35-.46-.35-.754v-.942c0-.22.095-.443.267-.636V5.364c.002-.04.163-2.455 2.934-2.455.45 0 .858.068 1.225.198-.045.308-.034.55-.025.654v1.29c-.173.252-.267.55-.267.857V7c0 .407.16.79.443 1.072.238.872.654 1.548.89 1.885v.767c0 .114-.06.22-.16.274l-2.378 1.327z',
            },
        ],
    },
    'tree-dots': {
        paths:[
            {
                d: 'M8 5c-1.1045695 0-2-.8954305-2-2s.8954305-2 2-2 2 .8954305 2 2-.8954305 2-2 2zm0 5c-1.1045695 0-2-.8954305-2-2s.8954305-2 2-2 2 .8954305 2 2-.8954305 2-2 2zm0 5c-1.1045695 0-2-.8954305-2-2s.8954305-2 2-2 2 .8954305 2 2-.8954305 2-2 2z',
            },
        ],
    },
    'twitter': {
        paths:[
            {
                d:  'M12.002 14.99V9.33s-.17-1.514-1.638-1.514c-1.47 0-1.738 1.44-1.738 1.44v5.73H5.598l.05-9.344h2.928L8.553 6.82s.61-1.537 2.91-1.537c2.3 0 3.343 1.317 3.537 3.78v5.926h-2.998zM1.885 4.315C.845 4.316 0 3.576 0 2.66S.845 1 1.885 1s1.885.743 1.885 1.66c0 .915-.845 1.656-1.885 1.656zM3.753 15H.03V5.668l3.723-.024V15z',
            },
        ],
    },
    'user': {
        paths:[
            {
                d: 'M10.7 11.437l-2.493-1.274a.703.703 0 0 1-.38-.63V8.63a6.146 6.146 0 0 0 .958-1.8 1.06 1.06 0 0 0 .606-.964V4.8a1.08 1.08 0 0 0-.26-.7V2.682c.014-.147.071-1.02-.546-1.74C8.049.316 7.179 0 6 0 4.82 0 3.951.317 3.415.941c-.617.72-.56 1.594-.545 1.74V4.1a1.076 1.076 0 0 0-.261.7v1.067c0 .324.144.627.39.829.24.967.74 1.696.914 1.93v.882a.708.708 0 0 1-.36.619l-2.327 1.298A2.413 2.413 0 0 0 0 13.537v.863C0 15.666 3.925 16 6 16s6-.334 6-1.6v-.811a2.4 2.4 0 0 0-1.3-2.152',
            },
        ],
    },
    'video': {
        paths:[
            {
                d:    'M15.724 2H.276C.124 2 0 2.117 0 2.26v11.48c0 .143.124.26.276.26h15.448c.152 0 .276-.117.276-.26V2.26c0-.143-.124-.26-.276-.26zM.552 11.13H2.76v2.348H.55V11.13zm0-2.87H2.76v2.35H.55V8.26zm0-2.87H2.76v2.35H.55V5.39zm0-2.868H2.76V4.87H.55V2.522zM10.08 8.22l-3.035 1.826c-.045.027-.097.04-.148.04-.046 0-.092-.01-.133-.03-.088-.047-.143-.135-.143-.23V6.174c0-.095.056-.183.144-.23.088-.045.196-.04.28.01L10.08 7.78c.08.048.127.13.127.22s-.048.172-.128.22zm3.16 2.91h2.208v2.348H13.24V11.13zm0-2.87h2.208v2.35H13.24V8.26zm0-2.87h2.208v2.35H13.24V5.39zm0-2.868h2.208V4.87H13.24V2.522z',
            },
        ],
    },
    'pdf': {
        width: '14px',
        height: '18px',
        paths: [
            {
                d: 'M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z',
                fill: '#CB0606',
            },
            {
                d: 'M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z',
                fill: '#FB8D8D',
            },
            {
                d: 'M10.868 9.653a1.171 1.171 0 0 0-.366-.063c-.133 0-.225.027-.275.082-.05.055-.075.152-.075.291v.267h.56v.535h-.56v2.204h-.68v-2.204h-.35v-.535h.35v-.267c0-.339.085-.584.254-.736.17-.151.425-.227.765-.227.16 0 .33.022.509.065l-.132.588zm-2.847 3.05c-.127.106-.26.19-.4.253-.141.062-.3.094-.48.094-.348 0-.614-.125-.798-.374-.185-.249-.277-.6-.277-1.055 0-.464.102-.825.304-1.083.203-.258.488-.387.855-.387.13 0 .263.027.4.08.137.053.251.12.34.202V9.081h.68v3.888h-.624v-.267zm-.056-1.713a1.091 1.091 0 0 0-.267-.172.765.765 0 0 0-.325-.074.515.515 0 0 0-.44.234c-.11.156-.166.367-.166.633 0 .263.045.469.135.619.091.15.23.224.42.224a.85.85 0 0 0 .344-.077c.117-.051.217-.114.3-.189V10.99zM5.06 12.872a1.006 1.006 0 0 1-.598.178c-.306 0-.566-.095-.782-.285V14H3v-3.77h.627v.269c.127-.108.26-.193.4-.255.139-.062.299-.093.48-.093.35 0 .615.122.798.366.182.244.274.598.274 1.063 0 .294-.045.553-.134.778a1.12 1.12 0 0 1-.385.514zm-.321-1.905a.459.459 0 0 0-.417-.223.848.848 0 0 0-.34.077 1.14 1.14 0 0 0-.302.19v1.198c.072.064.16.121.267.17a.76.76 0 0 0 .328.075.508.508 0 0 0 .441-.236c.108-.158.162-.367.162-.628 0-.266-.046-.474-.14-.623z',
                fill: '#FFF',
            },
        ],
    },
    'doc': {
        width: '14px',
        height: '18px',
        paths: [
            {
                d: 'M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z',
                fill: '#06A4CB',
            },
            {
                d: 'M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z',
                fill: '#5DDFFF',
            },
            {
                d: 'M4.63 10.548V15h-.918v-.474a1.14 1.14 0 0 1-.432.381 1.297 1.297 0 0 1-.588.129c-.304 0-.571-.069-.801-.207a1.39 1.39 0 0 1-.534-.585 1.92 1.92 0 0 1-.189-.87c0-.324.062-.61.186-.858s.3-.44.528-.576c.228-.136.49-.204.786-.204.456 0 .804.17 1.044.51v-1.698h.918zm-1.143 3.495c.15-.166.225-.381.225-.645s-.075-.479-.225-.645a.745.745 0 0 0-.579-.249.752.752 0 0 0-.585.249c-.15.166-.227.381-.231.645.004.264.081.479.231.645.15.166.345.249.585.249a.745.745 0 0 0 .579-.249zm4.428-2.097c.262.136.465.328.609.576.144.248.216.536.216.864 0 .324-.072.611-.216.861s-.347.444-.609.582a1.909 1.909 0 0 1-.903.207c-.344 0-.647-.069-.909-.207a1.486 1.486 0 0 1-.609-.582 1.694 1.694 0 0 1-.216-.861c0-.328.072-.616.216-.864.144-.248.347-.44.609-.576.262-.136.565-.204.909-.204.34 0 .641.068.903.204zm-1.488.81c-.15.164-.225.378-.225.642s.075.478.225.642c.15.164.345.246.585.246a.75.75 0 0 0 .579-.246c.15-.164.225-.378.225-.642s-.075-.478-.225-.642a.75.75 0 0 0-.579-.246.756.756 0 0 0-.585.246zm4.359-.228a.737.737 0 0 0-.567.237c-.146.158-.219.367-.219.627s.072.471.216.633a.706.706 0 0 0 .552.243c.336 0 .586-.126.75-.378l.636.432a1.368 1.368 0 0 1-.573.528 1.89 1.89 0 0 1-.861.186c-.324 0-.61-.068-.858-.204a1.446 1.446 0 0 1-.579-.576 1.735 1.735 0 0 1-.207-.858c0-.328.069-.617.207-.867.138-.25.332-.444.582-.582.25-.138.539-.207.867-.207.308 0 .582.059.822.177s.432.285.576.501l-.624.45a.881.881 0 0 0-.72-.342z',
                fill: '#FFF',
            },
        ],
    },
    'xls': {
        width: '14px',
        height: '18px',
        paths: [
            {
                fill: '#8DC489',
                d: 'M14 4.737v11.842c0 .785-.649 1.421-1.448 1.421H1.448C.648 18 0 17.364 0 16.579V1.42C0 .636.648 0 1.448 0h7.724L14 4.737z',
            },
            {
                fill: '#AAE1A7',
                d: 'M14 4.418V5h-3.839C9.367 5 9 4.355 9 3.56V0h.581L14 4.418z',
            },
            {
                fill: '#FFF',
                d: 'M3.12 11.772h1.056l.594.978.63-.978h1.008l-1.026 1.572L6.48 15H5.418l-.648-1.056L4.062 15h-1.02l1.116-1.65-1.038-1.578zm3.888-1.224h.924V15h-.924v-4.452zm3.36 1.941a1.562 1.562 0 0 0-.462-.081.53.53 0 0 0-.27.06.196.196 0 0 0-.102.18c0 .088.046.156.138.204.092.048.242.102.45.162.228.068.416.135.564.201.148.066.276.164.384.294s.162.301.162.513a.87.87 0 0 1-.369.747c-.246.178-.561.267-.945.267-.264 0-.518-.039-.762-.117a1.964 1.964 0 0 1-.636-.333l.3-.624c.164.128.347.227.549.297.202.07.393.105.573.105.124 0 .223-.021.297-.063s.111-.105.111-.189c0-.092-.047-.164-.141-.216a2.357 2.357 0 0 0-.453-.168 4.583 4.583 0 0 1-.549-.192.979.979 0 0 1-.375-.291.787.787 0 0 1-.156-.507c0-.32.12-.568.36-.744.24-.176.544-.264.912-.264.22 0 .44.031.66.093.22.062.42.151.6.267l-.318.63a2.69 2.69 0 0 0-.522-.231z',
            },
        ],
    },
}

const Icon = ({ name }) => {
    const svgParams = {
        ...icons[name],
        paths: undefined,
    };

    return (
        <svg xmlns='http://www.w3.org/2000/svg' className='icon' viewBox='0 0 16 16' {...svgParams}>
            {icons[name].paths.map(path =>
                <path fillRule='evenodd' {...path} />
            )}
        </svg>
    );
};

export default Icon;
