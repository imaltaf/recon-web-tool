import React from 'react';
import { useEffect } from 'react';

const CommandList = ({ domain }) => {
    if (!domain) return null;

    useEffect(() => {
        window.copyToClipboard = (button, preId) => {
            const pre = document.getElementById(preId);
            const commandText = pre.textContent.trim();
        
            navigator.clipboard.writeText(commandText).then(() => {
                button.classList.add('bg-green-500', 'hover:bg-green-600');
                setTimeout(() => {
                    button.classList.remove('bg-green-500', 'hover:bg-green-600');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        };
    }, []);

    const commands = `
<h2 class="bg-gray-900 text-green-400 font-mono text-xl p-4 rounded-lg shadow-lg border border-gray-700 my-4">crt.sh Enumeration</h2>
<pre id="crtshCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20  font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'crtshCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
</svg>


  </button>
  curl -s "https://crt.sh/?q=%25.${domain}&output=json" | jq -r '.[].name_value' 2>/dev/null | sed 's/\\*\\.//g' | sort -u | grep -o "\\w.*${domain}" | anew -q cert_${domain}.list
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">hackertarget.com Enumeration</h2>
<pre id="hackertargetCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20  font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'hackertargetCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  curl -s "https://api.hackertarget.com/hostsearch/?q=${domain}" | grep -o "\\w.*${domain}" | anew -q htarget_${domain}.list
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">riddler.io Enumeration</h2>
<pre id="riddlerCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20  font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'riddlerCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  curl -s "https://riddler.io/search/exportcsv?q=pld:${domain}" | grep -Po "(([\w.-]*)\\.([\w]*)\\.([A-z]))\\w+" | grep -o "\\w.*${domain}" | anew -q riddler_${domain}.list
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">assetfinder Enumeration</h2>
<pre id="assetfinderCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20 font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'assetfinderCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  assetfinder --subs-only ${domain} | anew -q assetfinder_${domain}.list
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">Sublist3r Enumeration</h2>
<pre id="sublist3rCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20  font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'sublist3rCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  python3 ~/tools/Sublist3r/sublist3r.py -d ${domain} -o sublister_${domain}.list &> /dev/null
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">subfinder Enumeration</h2>
<pre id="subfinderCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20  font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'subfinderCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  subfinder -silent -d ${domain} -all -t 100 -o subfinder_${domain}.list &> /dev/null
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">amass Passive Enumeration</h2>
<pre id="amassCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20 font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'amassCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  amass enum -passive -d ${domain} -o amass_${domain}.list &> /dev/null
</pre>

<h2 class="text-xl font-semibold mt-6 text-white">crobat Enumeration</h2>
<pre id="crobatCommand" class="glassmorph relative">
  <button class="copy-button absolute right-4 top-4 bg-transparent hover:bg-opacity-20 text-white font-bold py-1 px-2 rounded transition duration-200" onclick="copyToClipboard(this, 'crobatCommand')">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>

  </button>
  crobat -s ${domain} | anew -q crobat_${domain}.list
</pre>
`;

    return (
        <div dangerouslySetInnerHTML={{ __html: commands }} />
    );
};

export default CommandList;
