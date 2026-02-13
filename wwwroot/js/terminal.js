// Terminal Emulator
let commandHistory = [];
let historyIndex = -1;
let currentDirectory = '~';

const commands = {
    help: {
        description: 'Display available commands',
        action: () => {
            return `
<div class="output-line">Available commands:</div>
<div class="output-line"></div>
<div class="output-line">  <span style="color: #00ffff;">help</span>        Display this help message</div>
<div class="output-line">  <span style="color: #00ffff;">about</span>       About Bjørnar Borge</div>
<div class="output-line">  <span style="color: #00ffff;">links</span>       Show all links</div>
<div class="output-line">  <span style="color: #00ffff;">linkedin</span>    Open LinkedIn profile</div>
<div class="output-line">  <span style="color: #00ffff;">github</span>      Open GitHub profile</div>
<div class="output-line">  <span style="color: #00ffff;">substack</span>    Open Substack newsletter</div>
<div class="output-line">  <span style="color: #00ffff;">medium</span>      Open Medium profile</div>
<div class="output-line">  <span style="color: #00ffff;">clear</span>       Clear terminal screen</div>
<div class="output-line">  <span style="color: #00ffff;">whoami</span>      Display current user</div>
<div class="output-line">  <span style="color: #00ffff;">date</span>        Display current date and time</div>
<div class="output-line">  <span style="color: #00ffff;">neofetch</span>    Display system information</div>
<div class="output-line">  <span style="color: #00ffff;">bear</span>        Show a friendly bear 🐻</div>
<div class="output-line"></div>
            `;
        }
    },
    about: {
        description: 'About Bjørnar Borge',
        action: () => {
            return `
<div class="output-line">╔══════════════════════════════════════════════════╗</div>
<div class="output-line">║                                                  ║</div>
<div class="output-line">║      Bjørnar Borge - Developer Profile           ║</div>
<div class="output-line">║                                                  ║</div>
<div class="output-line">║  Role: Developer / Writer / Creator             ║</div>
<div class="output-line">║                                                  ║</div>
<div class="output-line">║  Passionate about technology, writing, and       ║</div>
<div class="output-line">║  creating innovative solutions. Connect with     ║</div>
<div class="output-line">║  me on social platforms to follow my journey!    ║</div>
<div class="output-line">║                                                  ║</div>
<div class="output-line">╚══════════════════════════════════════════════════╝</div>
            `;
        }
    },
    links: {
        description: 'Show all links',
        action: () => {
            return `
<div class="output-line">📎 Social Links:</div>
<div class="output-line"></div>
<div class="output-line">  ➤ LinkedIn:  <a href="https://www.linkedin.com/in/0x8j0rn4r80r93/" target="_blank">https://www.linkedin.com/in/0x8j0rn4r80r93/</a></div>
<div class="output-line">  ➤ GitHub:    <a href="https://github.com/0x8j0rn4r80r93" target="_blank">https://github.com/0x8j0rn4r80r93</a></div>
<div class="output-line">  ➤ Substack:  <a href="https://substack.com/@0x8j0rn4r80r93" target="_blank">https://substack.com/@0x8j0rn4r80r93</a></div>
<div class="output-line">  ➤ Medium:    <a href="https://medium.com/@0x8j0rn4r80r93" target="_blank">https://medium.com/@0x8j0rn4r80r93</a></div>
<div class="output-line"></div>
            `;
        }
    },
    linkedin: {
        description: 'Open LinkedIn profile',
        action: () => {
            window.open('https://www.linkedin.com/in/0x8j0rn4r80r93/', '_blank');
            return '<div class="output-line success">Opening LinkedIn profile in new tab...</div>';
        }
    },
    github: {
        description: 'Open GitHub profile',
        action: () => {
            window.open('https://github.com/0x8j0rn4r80r93', '_blank');
            return '<div class="output-line success">Opening GitHub profile in new tab...</div>';
        }
    },
    substack: {
        description: 'Open Substack newsletter',
        action: () => {
            window.open('https://substack.com/@0x8j0rn4r80r93', '_blank');
            return '<div class="output-line success">Opening Substack newsletter in new tab...</div>';
        }
    },
    medium: {
        description: 'Open Medium profile',
        action: () => {
            window.open('https://medium.com/@0x8j0rn4r80r93', '_blank');
            return '<div class="output-line success">Opening Medium profile in new tab...</div>';
        }
    },
    clear: {
        description: 'Clear terminal screen',
        action: () => {
            const output = document.getElementById('output');
            const terminalBody = document.querySelector('.terminal-body');
            // Keep only the welcome text
            const welcomeText = output.querySelector('.welcome-text');
            output.innerHTML = '';
            if (welcomeText) {
                output.appendChild(welcomeText.cloneNode(true));
            }
            // Reset scroll to top
            if (terminalBody) {
                terminalBody.scrollTop = 0;
            }
            return '';
        }
    },
    whoami: {
        description: 'Display current user',
        action: () => {
            return '<div class="output-line">bjornar</div>';
        }
    },
    date: {
        description: 'Display current date and time',
        action: () => {
            const now = new Date();
            return `<div class="output-line">${now.toString()}</div>`;
        }
    },
    neofetch: {
        description: 'Display system information',
        action: () => {
            // Get visitor info
            const nav = navigator;
            const screen = window.screen;
            const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
            const lang = nav.language || nav.userLanguage;
            const languages = nav.languages ? nav.languages.join(', ') : lang;
            const platform = nav.platform;
            const cores = nav.hardwareConcurrency || 'Unknown';
            const memory = nav.deviceMemory ? `${nav.deviceMemory} GB` : 'Unknown';
            const cookiesEnabled = nav.cookieEnabled ? 'Enabled' : 'Disabled';
            const doNotTrack = nav.doNotTrack === '1' ? 'Yes' : 'No';
            const online = nav.onLine ? 'Online' : 'Offline';
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const screenRes = `${screen.width}x${screen.height}`;
            const colorDepth = `${screen.colorDepth}-bit`;
            const pixelRatio = window.devicePixelRatio || 1;
            const connectionType = connection ? (connection.effectiveType || connection.type || 'Unknown') : 'Unknown';
            const uptime = Math.floor(performance.now() / 1000);
            const uptimeMin = Math.floor(uptime / 60);
            const uptimeSec = uptime % 60;
            
            // Canvas fingerprint (simple version)
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('🐻', 2, 2);
            const canvasFingerprint = canvas.toDataURL().slice(-20);
            
            return `
<div class="output-line"><span style="color: #00ccff;">visitor@portfolio</span></div>
<div class="output-line">────────────────────────</div>
<div class="output-line"><span style="color: #ff79c6;">Browser:</span> ${nav.userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/)?.[0] || 'Unknown'}</div>
<div class="output-line"><span style="color: #ff79c6;">Platform:</span> ${platform}</div>
<div class="output-line"><span style="color: #ff79c6;">Language:</span> ${lang}</div>
<div class="output-line"><span style="color: #ff79c6;">Timezone:</span> ${timezone}</div>
<div class="output-line"><span style="color: #ff79c6;">Screen:</span> ${screenRes}</div>
<div class="output-line"><span style="color: #ff79c6;">Color Depth:</span> ${colorDepth}</div>
<div class="output-line"><span style="color: #ff79c6;">Pixel Ratio:</span> ${pixelRatio}x</div>
<div class="output-line"><span style="color: #ff79c6;">CPU Cores:</span> ${cores}</div>
<div class="output-line"><span style="color: #ff79c6;">Memory:</span> ${memory}</div>
<div class="output-line"><span style="color: #ff79c6;">Connection:</span> ${connectionType}</div>
<div class="output-line"><span style="color: #ff79c6;">Cookies:</span> ${cookiesEnabled}</div>
<div class="output-line"><span style="color: #ff79c6;">Do Not Track:</span> ${doNotTrack}</div>
<div class="output-line"><span style="color: #ff79c6;">Status:</span> ${online}</div>
<div class="output-line"><span style="color: #ff79c6;">Uptime:</span> ${uptimeMin}m ${uptimeSec}s</div>
<div class="output-line"><span style="color: #ff79c6;">Fingerprint:</span> ...${canvasFingerprint}</div>
            `;
        }
    },
    bear: {
        description: 'Show a friendly bear',
        action: () => {
            return `
<div class="output-line" style="text-align: center;">&nbsp;</div>
<div class="output-line" style="text-align: center;">         ʕ•ᴥ•ʔ</div>
<div class="output-line" style="text-align: center;">     .--.      .--.</div>
<div class="output-line" style="text-align: center;">    : (&#92;&#92; ". _......_ ." /) :</div>
<div class="output-line" style="text-align: center;">     '.    &#96;        &#96;    .'</div>
<div class="output-line" style="text-align: center;">      /'   _      _   &#96;&#92;&#92;</div>
<div class="output-line" style="text-align: center;">     /     0}      {0     &#92;&#92;</div>
<div class="output-line" style="text-align: center;">    |       /      &#92;&#92;       |</div>
<div class="output-line" style="text-align: center;">    |     /'        &#96;&#92;&#92;     |</div>
<div class="output-line" style="text-align: center;">     &#92;&#92;   | .  .==.  . |   /</div>
<div class="output-line" style="text-align: center;">      '._ &#92;&#92;.' &#92;&#92;__/ './ _.'</div>
<div class="output-line" style="text-align: center;">      /  &#96;&#96;'._-''-_.&#96;&#96;  &#92;&#92;</div>
<div class="output-line" style="text-align: center;">&nbsp;</div>
<div class="output-line" style="text-align: center; color: #ffff55; font-size: 16px;">🐻 Rawr! Have a great day! 🐻</div>
<div class="output-line" style="text-align: center;">&nbsp;</div>
            `;
        }
    }
};

function initializeTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('output');

    if (!input) return;

    // Focus input on click anywhere in terminal
    document.querySelector('.terminal-body').addEventListener('click', () => {
        input.focus();
    });

    // Handle input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.value.trim();
            if (command) {
                executeCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            autocomplete(input);
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            commands.clear.action();
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            input.value = '';
        }
    });

    // Keep input focused
    input.focus();
}

function executeCommand(commandText) {
    const output = document.getElementById('output');
    const cmdLine = document.createElement('div');
    cmdLine.className = 'output-line';
    cmdLine.innerHTML = `<span class="prompt">bjornar@portfolio:~$</span> <span style="color: #00ffff;">${escapeHtml(commandText)}</span>`;
    output.appendChild(cmdLine);

    const cmdName = commandText.toLowerCase().trim();
    
    console.log('Command entered:', cmdName);
    console.log('Available commands:', Object.keys(commands));
    
    if (commands[cmdName]) {
        console.log('Executing command:', cmdName);
        const result = commands[cmdName].action();
        if (result) {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = result;
            output.appendChild(resultDiv);
        }
    } else if (cmdName === '') {
        // Do nothing for empty command
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'output-line error';
        errorDiv.textContent = `Command not found: ${cmdName}. Type 'help' for available commands.`;
        output.appendChild(errorDiv);
    }

    // Scroll to bottom
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function autocomplete(input) {
    const partial = input.value.toLowerCase();
    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
    
    if (matches.length === 1) {
        input.value = matches[0];
    } else if (matches.length > 1) {
        const output = document.getElementById('output');
        const suggestDiv = document.createElement('div');
        suggestDiv.className = 'output-line';
        suggestDiv.innerHTML = `<span style="color: #ffff55;">Suggestions: ${matches.join(', ')}</span>`;
        output.appendChild(suggestDiv);
        
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is loaded
function init() {
    // Wait a bit for Blazor to finish rendering
    setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (input) {
            initializeTerminal();
        } else {
            // Try again if not ready
            setTimeout(init, 100);
        }
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for Blazor interop
window.initializeTerminal = initializeTerminal;
