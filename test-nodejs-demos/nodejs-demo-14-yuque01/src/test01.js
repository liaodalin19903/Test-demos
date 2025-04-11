import * as zlib from 'zlib';
import { Buffer } from 'buffer';

function decodeData(dataStr) {
    return new Promise((resolve, reject) => {
        try {
            // Step 1: Base64 decode
            const base64Decoded = Buffer.from(dataStr, 'base64');

            // Step 2: Gzip decompress
            zlib.gunzip(base64Decoded, (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer.toString('utf-8'));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

// 使用示例
const dataStr = "{\"format\":\"lakesheet\",\"version\":\"3.5.5\",\"larkJson\":true,\"sheet\":\"xµßÒ@\\u0014Æße¼íE»,4ñF}\\u0000¹Ü\\u0010ÃÂ¨F(øgÓM\\u0000º&\\u0006p]\\u0004\\u0014$ìºXè>ÍL[®|\\u0005O§ü©@/4ñ¦éÌù¾s¾ùeÚ#§0\\u0012Qô\\u0001Æª8Q\\u001eG\\\\ZEbç9Å2N¨Î\\\"ñÈ)Âþ.\\u0012Ä°W-°ÍÕ\\\"\\u000e®<Ìuîêk×Ïi¨1S.åvßq\\u001eYé\\u0019ä\\tìÀìD.«*©èb\\u0003Ä»\\u001e ¬)\\u0004\\u0001\\u0014A\\u000f¯)ø°\\u0006{¬â;]J'ñ\\u0013$òÞð R8s\\u001fG°,ÏSJI`ôHÙ\\u000f\\u0002¡d\\\\;S½eè<Tiã%ýþè¯hí³5)¢E\\\\VèÖàVÞYz;dÜ²Nß\\u0013xoVÑ±>]£EôU§Ùà-¨Y\\rBhEåeÂÒÙ©L[d<!?«v³n×\\f³Ð³/úË\\u0004ë\\u0006ú¼æõ¬ÔÁ­êQúV«¸Í\\u0003¦@à\\u000f\\fÖpHÆ\\u0005ók÷×´Ekgfõ^uáÀäº=;-Ðou6A¯û\\u001a¶\\u0012bCªs\\u000fc»´mu\\\"ÞÜ\\u0002ï¿aÛ\\u0014\\u0001¼Y»L×Ö¤a^¾p3íùc\\u001bÙ\\u001fêóÛb|¤Ó\\u00064 m~ØE³3t{ûSd~2þB+\\u00032=v ¿4´zÇÀÅnvýYºK}æß´9¹ý/\\\"ÑËÞ³³ÐçÖÅù­¿Aý\\u000f\\u0001\\r¤[^I\\u0010ç£ªÁÌ¡>ñÝÃxâ!ü\\u0014øê\\u000fÐýÐíPH@1Î­:{<iZì7©Åo`\",\"calcChain\":[],\"vessels\":{},\"useUTC\":true,\"useIndex\":true,\"customColors\":[],\"meta\":{\"sort\":0,\"shareFilter\":0},\"formulaCalclated\":true,\"versionId\":\"gwmmvXeOQdWgRsAz\"}";

decodeData(dataStr)
    .then(decodedData => {
        console.log(decodedData);
    })
    .catch(error => {
        console.error('解码失败:', error);
    });