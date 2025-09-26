// 合并配置脚本 - 基于1.js框架集成2.js的国家节点分组功能

// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH，因腾讯云即将关闭免费版IP访问，故用域名
];

// 国外DNS服务器
const foreignNameservers = [
  "https://cloudflare-dns.com/dns-query", // CloudflareDNS
  "https://77.88.8.8/dns-query", //YandexDNS
  "https://8.8.4.4/dns-query#ecs=1.1.1.1/24&ecs-override=true", // GoogleDNS
  "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true", // OpenDNS
  "https://9.9.9.9/dns-query", //Quad9DNS
];

// DNS配置 - 使用1.js的配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  // "ipv6": true,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5","1.2.4.8"],
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver":[...domesticNameservers],
  "direct-nameserver":[...domesticNameservers],
  "direct-nameserver-follow-policy":false,
  "nameserver-policy": {
    "geosite:cn": domesticNameservers
  }
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

// 规则集配置 - 使用1.js的配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/openai.yaml",
    "path": "./ruleset/MetaCubeX/openai.yaml"
  },
  "bybit": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bybit.yaml",
    "path": "./ruleset/MetaCubeX/bybit.yaml"
  },
  "pikpak": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/pikpak.yaml",
    "path": "./ruleset/MetaCubeX/pikpak.yaml"
  },
  "anthropic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/anthropic.yaml",
    "path": "./ruleset/MetaCubeX/anthropic.yaml"
  },
  "google-gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    "path": "./ruleset/MetaCubeX/google-gemini.yaml"
  },
  "xai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/xai.yaml",
    "path": "./ruleset/MetaCubeX/xai.yaml"
  },
  "perplexity": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/perplexity.yaml",
    "path": "./ruleset/MetaCubeX/perplexity.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    "path": "./ruleset/MetaCubeX/microsoft.yaml"
  },
};

// 规则 - 使用1.js的规则
const rules = [
  // 额外自定义规则
  "PROCESS-NAME,steam.exe,🐬 自定义直连",
  "DOMAIN-SUFFIX,immersivetranslate.com,🐳 自定义代理",
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,🔰 模式选择",
  "DOMAIN-SUFFIX,gstatic.com,🔰 模式选择",
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🔰 模式选择",
  "DOMAIN-SUFFIX,github.io,🔰 模式选择",
  "DOMAIN,v2rayse.com,🔰 模式选择",
  // MetaCubeX 规则集
  "RULE-SET,openai,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,pikpak,🅿️ PikPak",
  "RULE-SET,bybit,🪙 Bybit",
  "RULE-SET,anthropic,💵 Claude",
  "RULE-SET,google-gemini,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,xai,💸 ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,perplexity,💸 ChatGPT-Gemini-XAI-Perplexity",
  // Loyalsoldier 规则集
  "RULE-SET,applications,🔗 全局直连",
  "RULE-SET,private,🔗 全局直连",
  "RULE-SET,reject,🥰 广告过滤",
  "RULE-SET,microsoft,Ⓜ️ 微软服务",
  "RULE-SET,icloud,🍎 苹果服务",
  "RULE-SET,apple,🍎 苹果服务",
  "RULE-SET,google,📢 谷歌服务",
  "RULE-SET,proxy,🔰 模式选择",
  "RULE-SET,gfw,🔰 模式选择",
  "RULE-SET,tld-not-cn,🔰 模式选择",
  "RULE-SET,direct,🔗 全局直连",
  "RULE-SET,lancidr,🔗 全局直连,no-resolve",
  "RULE-SET,cncidr,🔗 全局直连,no-resolve",
  "RULE-SET,telegramcidr,📲 电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,🔗 全局直连,no-resolve",
  "GEOIP,CN,🔗 全局直连,no-resolve",
  "MATCH,🐟 漏网之鱼"
];

// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "http://www.gstatic.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 落地节点配置
const landingNodeProxies = [
    {
      "name": "webshare",
      "server": "",
      "port": 12345,
      "type": "socks5",
      "username": "",
      "password": "",
      "tls": false,
      "skip-cert-verify": true,
      "udp": true,
      "dialer-proxy": "⚙️ 节点选择"
    }
];

const landingNodeNames = landingNodeProxies.map(p => p.name);

// 从2.js导入的国家地区配置
const countryRegions = [
  { code: "HK", name: "香港", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg", regex: /(香港|HK|Hong Kong|🇭🇰)(?!.*(中国|CN|China|PRC|🇨🇳))/i },
  { code: "TW", name: "台湾", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg", regex: /(台湾|TW|Taiwan|🇹🇼)(?!.*(中国|CN|China|PRC|🇨🇳))(?!.*Networks)/i },  
  { code: "SG", name: "新加坡", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg", regex: /(新加坡|狮城|SG|Singapore|🇸🇬)/i },
  { code: "JP", name: "日本", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg", regex: /(日本|JP|Japan|东京|🇯🇵)/i },
  { code: "US", name: "美国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg", regex: /^(?!.*(Plus|plus|custom|Australia|AU|🇦🇺)).*(美国|洛杉矶|US|USA|United States|America|🇺🇸)/i },
  { code: "DE", name: "德国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/de.svg", regex: /^(?!.*shadowsocks).*(德国|DE|Germany|🇩🇪)/i },
  { code: "KR", name: "韩国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/kr.svg", regex: /(韩国|首尔|KR|Korea|South Korea|🇰🇷)/i },
  { code: "UK", name: "英国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/gb.svg", regex: /(英国|UK|United Kingdom|Britain|Great Britain|🇬🇧)/i },
  { code: "CA", name: "加拿大", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ca.svg", regex: /^(?!.*(Anycast|Datacamp)).*(加拿大|CA|Canada|🇨🇦)/i },
  { code: "AU", name: "澳大利亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/au.svg", regex: /(澳大利亚|AU|Australia|🇦🇺)/i },
  { code: "FR", name: "法国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/fr.svg", regex: /^(?!.*(free|Frontier|Frankfurt)).*(法国|FR|France|🇫🇷)/i },
  { code: "NL", name: "荷兰", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/nl.svg", regex: /^(?!.*(only|online|MNL)).*(荷兰|NL|Netherlands|🇳🇱)/i },
  { code: "RU", name: "俄罗斯", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ru.svg", regex: /(俄罗斯|RU|Russia|🇷🇺)/i },
  { code: "IN", name: "印度", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/in.svg", regex: /^(?!.*(Singapore|Argentina|Intel|Inc|ing|link|business|hinet|internet|印度尼西亚|main)).*(印度|IN|India|🇮🇳)/i },
  { code: "BR", name: "巴西", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/br.svg", regex: /(巴西|BR|Brazil|🇧🇷)/i },
  { code: "IT", name: "意大利", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/it.svg", regex: /^(?!.*(mitce|reality|digital|leiting|limited|it7|territories)).*(意大利|IT|Italy|🇮🇹)/i },
  { code: "CH", name: "瑞士", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ch.svg", regex: /^(?!.*(incheon|chunghwa|tech|psychz|channel|seychelles|chuncheon)).*(瑞士|CH|Switzerland|🇨🇭)/i },
  { code: "SE", name: "瑞典", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/se.svg", regex: /^(?!.*(sel2|sea1|server|selfhost|neonpulse|base|seoul|seychelles)).*(瑞典|SE|Sweden|🇸🇪)/i },
  { code: "NO", name: "挪威", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/no.svg", regex: /^(?!.*(none|node|annoy|cf_no1|technolog)).*(挪威|NO|Norway|🇳🇴)/i },
  { code: "CN", name: "中国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cn.svg", regex: /^(?!.*(台湾|香港|TW|CN_d)).*(中国|CN|China|PRC|🇨🇳)/i },
  { code: "MY", name: "马来西亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/my.svg", regex: /^(?!.*(myshadow)).*(马来西亚|MY|Malaysia|🇲🇾)/i },
  { code: "VN", name: "越南", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/vn.svg", regex: /(越南|VN|Vietnam|🇻🇳)/i },
  { code: "PH", name: "菲律宾", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ph.svg", regex: /^(?!.*(phoenix|phx)).*(菲律宾|PH|Philippines|🇵🇭)/i },
  { code: "TH", name: "泰国", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/th.svg", regex: /^(?!.*(GTHost|pathx)).*(泰国|TH|Thailand|🇹🇭)/i },
  { code: "ID", name: "印度尼西亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/id.svg", regex: /(印度尼西亚|ID|Indonesia|🇮🇩)/i },
  { code: "AR", name: "阿根廷", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ar.svg", regex: /^(?!.*(warp|arm|flare|star|shar|par|akihabara|bavaria)).*(阿根廷|AR|Argentina|🇦🇷)/i },
  { code: "NG", name: "尼日利亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ng.svg", regex: /^(?!.*(ong|ing|angeles|ang|ung)).*(尼日利亚|NG|Nigeria|🇳🇬)(?!.*(Hongkong|Singapore))/i },
  { code: "TR", name: "土耳其", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tr.svg", regex: /^(?!.*(trojan|str|central)).*(土耳其|TR|Turkey|🇹🇷)/i },
  { code: "ES", name: "西班牙", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/es.svg", regex: /^(?!.*(vless|angeles|vmess|seychelles|business|ies|reston)).*(西班牙|ES|Spain|🇪🇸)/i },
  { code: "AT", name: "奥地利", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/at.svg", regex: /^(?!.*(Gate)).*(奥地利|AT|Austria|🇦🇹)/i },
  { code: "MX", name: "墨西哥", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/mx.svg", regex: /(墨西哥|MX|Mexico|🇲🇽)/i },
  { code: "EE", name: "爱沙尼亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ee.svg", regex: /^(?!.*(free)).*(爱沙尼亚|EE|Estonia|🇪🇪)/i },
  { code: "PL", name: "波兰", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/pl.svg", regex: /(波兰|PL|Poland|🇵🇱)/i },
  { code: "IR", name: "伊朗", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ir.svg", regex: /(伊朗|IR|Iran|🇮🇷)/i },
  { code: "ZA", name: "南非", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/za.svg", regex: /(南非|ZA|South Africa|🇿🇦)/i },
  { code: "CO", name: "哥伦比亚", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/co.svg", regex: /(哥伦比亚|CO|Colombia|🇨🇴)/i },
  { code: "SA", name: "沙特阿拉伯", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sa.svg", regex: /^(?!.*(usa|sakura)).*(沙特阿拉伯|沙特|SA|Saudi Arabia|🇸🇦)/i },
  { code: "CL", name: "智利", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cl.svg", regex: /^(?!.*(cloud)).*(智利|CL|Chile|🇨🇱)/i },
  { code: "FI", name: "芬兰", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/fi.svg", regex: /^(?!.*(cloud)).*(芬兰|FI|Finland|fi)/i },
  { code: "UA", name: "乌克兰", icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/ua.svg", regex: /^(?!.*(cloud)).*(乌克兰|UA|Ukraine|ua)/i }
];

// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  "p1": {
    "type": "http",
    "url": "https://google.com",    
    "interval": 86400,
    "proxy": "🔰 模式选择",
    "override": { 
      "additional-prefix": "p1 |"
    }
  }
};

// 从2.js导入的工具函数
function getProxiesByRegex(params, regex) {
  const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
  // CN节点不生成自动选择组
  if (regex.test("CN") || regex.test("中国")) {
    return []; // 返回空数组，不生成CN自动选择组
  }
  return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

function getManualProxiesByRegex(params, regex) {
  const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
  // CN节点不生成代理组，因为中国节点通常应该直连
  if (regex.test("CN") || regex.test("中国")) {
    return []; // 返回空数组，不生成CN代理组
  }
  return matchedProxies.length > 0 
    ? matchedProxies 
    : ["DIRECT", "手动选择", "🔰 模式选择"];
}

// 生成国家节点分组的函数
function generateCountryGroups(params) {
  const allProxies = params["proxies"].map((e) => e.name);
  
  // 检测可用的国家代码
  const availableCountryCodes = new Set();
  const otherProxies = [];
  
  for (const proxy of params["proxies"]) {
    let bestMatch = null;
    let longestMatchLength = 0;

    for (const region of countryRegions) {
      const match = proxy.name.match(region.regex);
      if (match) {
        if (match[0].length > longestMatchLength) {
          longestMatchLength = match[0].length;
          bestMatch = region.code;
        }
      }
    }

    if (bestMatch) {
      // 排除CN代码，不添加到可用国家代码中，CN节点归类为其他节点
      if (bestMatch !== "CN") {
        availableCountryCodes.add(bestMatch);
      } else {
        // CN节点归类为其他节点
        otherProxies.push(proxy.name);
      }
    } else {
      otherProxies.push(proxy.name);
    }
  }

  // 不添加CN到可用国家代码中，确保不生成CN代理组

  // 生成自动选择组（排除CN）
  const autoProxyGroupRegexs = countryRegions
    .filter(region => availableCountryCodes.has(region.code) && region.code !== "CN")
    .map(region => ({
      name: `${region.code} - 自动选择`,
      regex: region.regex,
    }));

  const autoProxyGroups = autoProxyGroupRegexs
    .map((item) => ({
      ...groupBaseOption,
      name: item.name,
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: getProxiesByRegex(params, item.regex),
      hidden: true,
    }))
    .filter((item) => item.proxies.length > 0);

  // 生成手动选择组（排除CN）
  const manualProxyGroups = countryRegions
    .filter(region => availableCountryCodes.has(region.code) && region.code !== "CN")
    .map(region => ({
      ...groupBaseOption,
      name: `${region.code} - 手动选择`,
      type: "select",
      proxies: getManualProxiesByRegex(params, region.regex),
      icon: region.icon,
      hidden: false,
    }))
    .filter(item => item.proxies.length > 0);

  // 其他节点组
  let otherGroups = [];
  if (otherProxies.length > 0) {
    otherGroups = [
      {
        ...groupBaseOption,
        name: "其它 - 手动选择",
        type: "select",
        proxies: otherProxies,
        icon: "https://www.clashverge.dev/assets/icons/guard.svg",
        hidden: false,
      },
      {
        ...groupBaseOption,
        name: "其它 - 自动选择",
        type: "url-test",
        url: "http://www.gstatic.com/generate_204",
        interval: 300,
        tolerance: 50,
        proxies: otherProxies,
        hidden: true,
      }
    ];
  }

  return {
    autoGroups: autoProxyGroups,
    manualGroups: manualProxyGroups,
    otherGroups: otherGroups,
    availableCountryCodes: availableCountryCodes
  };
}

// 基础代理组配置（1.js的配置加上国家节点选项）
function generateBaseProxyGroups(countryData) {
  const countryAutoOptions = countryData.autoGroups.map(g => g.name);
  const countryManualOptions = countryData.manualGroups.map(g => g.name);
  const otherAutoOptions = countryData.otherGroups.filter(g => g.type === "url-test").map(g => g.name);
  const otherManualOptions = countryData.otherGroups.filter(g => g.type === "select").map(g => g.name);
  
  return [
    {
      ...groupBaseOption,
      "name": "🔰 模式选择",
      "type": "select",
      "proxies": [
        "⚙️ 节点选择",
        "🕊️ 落地节点",
        "🔗 全局直连",
        //...countryManualOptions,
        //...otherManualOptions
      ]
    },
    {
      ...groupBaseOption,
      "name": "⚙️ 节点选择",
      "type": "select",
      "proxies": ["♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...otherAutoOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "🕊️ 落地节点", 
      "type": "select",
      "proxies": [...landingNodeNames], 
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
    },
    {
      ...groupBaseOption,
      "name": "♻️ 延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "🚑 故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️ 负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "☁️ 负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    }
  ];
}

// 应用专用代理组配置
function generateAppProxyGroups(countryData) {
  const countryAutoOptions = countryData.autoGroups.map(g => g.name);
  const countryManualOptions = countryData.manualGroups.map(g => g.name);
  const otherAutoOptions = countryData.otherGroups.filter(g => g.type === "url-test").map(g => g.name);
  const otherManualOptions = countryData.otherGroups.filter(g => g.type === "select").map(g => g.name);
  
  return [
    {
      ...groupBaseOption,
      "name": "🌍 国外媒体",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "💸 ChatGPT-Gemini-XAI-Perplexity",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "exclude-filter": "(?i)港|hk|hongkong|hong kong|俄|ru|russia|澳|macao",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "💵 Claude",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
    },
    {
      ...groupBaseOption,
      "name": "🪙 Bybit",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "🅿️ PikPak",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "📲 电报消息",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "📢 谷歌服务",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "🍎 苹果服务",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软服务",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    }
  ];
}

// 系统代理组配置
function generateSystemProxyGroups(countryData) {
  const countryAutoOptions = countryData.autoGroups.map(g => g.name);
  const countryManualOptions = countryData.manualGroups.map(g => g.name);
  const otherAutoOptions = countryData.otherGroups.filter(g => g.type === "url-test").map(g => g.name);
  const otherManualOptions = countryData.otherGroups.filter(g => g.type === "select").map(g => g.name);
  
  return [
    {
      ...groupBaseOption,
      "name": "🥰 广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      "name": "🔗 全局直连",
      "type": "select",
      "proxies": ["DIRECT", "⚙️ 节点选择", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": false,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
      "url": "http://www.baidu.com",
      "interval": 300,
      "timeout": 3000,
      "lazy": true,
      "max-failed-times": 3,
      "hidden": false
    },
    {
      ...groupBaseOption,
      "name": "❌ 全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐬 自定义直连",
      "type": "select",
      "include-all": true,
      "proxies": ["🔗 全局直连", "🔰 模式选择", "⚙️ 节点选择", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐳 自定义代理",
      "type": "select",
      "include-all": true,
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连", ...countryAutoOptions, ...countryManualOptions, ...otherAutoOptions, ...otherManualOptions],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];
}

// 主函数 - 程序入口
function main(config) {
  const originalProxies = config?.proxies ? [...config.proxies] : [];
  const proxyCount = originalProxies.length;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = originalProviders !== null && typeof originalProviders === 'object' ? Object.keys(originalProviders).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 设置DNS配置
  config["dns"] = dnsConfig;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 处理原始代理（确保UDP支持）
  const processedProxies = originalProxies.map(proxy => {
      if (proxy && typeof proxy === 'object' && proxy.name) {
          proxy.udp = true;
          // 节点绑定的接口，从此接口发起连接，适用于部分vpn情况
          // proxy["interface-name"] = "WLAN"
          // proxy["interface-name"] = "以太网"
      } else {
          console.warn("警告：发现一个无效或缺少名称的原始代理配置:", proxy);
          return null;
      }
      return proxy;
  }).filter(p => p !== null);

  // 合并代理
  config["proxies"] = [...processedProxies, ...landingNodeProxies];
  config["proxy-providers"] = {
    ...originalProviders,
    ...proxyProviders
  };

  // 生成国家节点分组
  const countryData = generateCountryGroups(config);
  
  // 生成所有代理组
  const baseGroups = generateBaseProxyGroups(countryData);
  const appGroups = generateAppProxyGroups(countryData);
  const systemGroups = generateSystemProxyGroups(countryData);
  
  // 合并所有代理组：基础组 + 应用组 + 系统组 + 国家组（自动和手动）
  const allProxyGroups = [
    ...baseGroups,
    ...appGroups,
    ...systemGroups,
    ...countryData.autoGroups,
    ...countryData.manualGroups,
    ...countryData.otherGroups
  ];

  // 转义正则元字符，保证名字按"字面量"匹配
  function escapeForRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 取出所有落地节点的名字，并做转义
  const escapedNames = landingNodeNames
    .map(escapeForRegExp)
    .join('|');

  // 构造只匹配完全等于这些名字的正则
  const excludeLandingFilter = escapedNames
    ? `^(?:${escapedNames})$`
    : null;

  // 定义需要排除落地节点的组名
  const groupsToExcludeLandingNodes = [
      "⚙️ 节点选择",
      "♻️ 延迟选优",
      "🚑 故障转移",
      "⚖️ 负载均衡(散列)",
      "☁️ 负载均衡(轮询)"
  ];
  
  // 添加所有国家自动选择组到排除列表
  const countryAutoGroupNames = countryData.autoGroups.map(g => g.name);
  const otherAutoGroupNames = countryData.otherGroups.filter(g => g.type === "url-test").map(g => g.name);
  groupsToExcludeLandingNodes.push(...countryAutoGroupNames, ...otherAutoGroupNames);

  // 遍历所有代理组配置，为指定的组添加排除落地节点的过滤器
  const finalProxyGroups = allProxyGroups.map(group => {
      // 检查当前组名是否在需要排除落地节点的列表中，并且确实有落地节点需要排除
      if (groupsToExcludeLandingNodes.includes(group.name) && excludeLandingFilter) {
          // 合并已有的 exclude-filter：只要旧规则 或 新排除规则 匹配，就排除
          // 如果 group["exclude-filter"] 已存在，则用 | 连接新旧规则
          // 否则直接使用新的 excludeLandingFilter
          const existingFilter = group["exclude-filter"];
          group["exclude-filter"] = existingFilter
              ? `(${existingFilter})|(${excludeLandingFilter})`
              : excludeLandingFilter;

          console.log(
              `信息：为组 [${group.name}] 添加或合并了落地节点排除过滤器: ${group["exclude-filter"]}`
          );
      }
      return group; // 返回（可能已修改的）组配置
  });

  config["proxy-groups"] = finalProxyGroups; // 使用处理过的代理组
  return config;
}
