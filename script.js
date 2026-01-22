// 打字機效果文字
const messages = [
    "這裡是楊千逸的網站",
    "請多指教", 
    "歡迎來到我的數位世界"
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-animation');

function typeWriter() {
    const currentMessage = messages[messageIndex];
    
    // 修正：確保文字內容正確更新
    if (isDeleting) {
        typingElement.innerHTML = currentMessage.substring(0, charIndex - 1) + '<span class="cursor">█</span>';
        charIndex--;
    } else {
        typingElement.innerHTML = currentMessage.substring(0, charIndex) + '<span class="cursor">█</span>';
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 100;
    
    // 修正：完成輸入後等待才開始刪除
    if (!isDeleting && charIndex === currentMessage.length) {
        // 輸入完成，等待2秒後開始刪除
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
        // 繼續閃爍光標
        setTimeout(typeWriter, 100);
        return;
    } else if (isDeleting && charIndex === 0) {
        // 刪除完成，切換下一句
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(typeWriter, 500);
        return;
    }
    
    // 正常打字/刪除
    setTimeout(typeWriter, typeSpeed);
}

// 粒子效果
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -10px;
        width: 4px;
        height: 4px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 5;
        box-shadow: 0 0 10px #00ff88;
    `;
    
    document.body.appendChild(particle);
    
    const fallSpeed = 2 + Math.random() * 3;
    const duration = 3000 + Math.random() * 2000;
    
    particle.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// 啟動效果
document.addEventListener('DOMContentLoaded', function() {
    // 開始打字機效果
    setTimeout(typeWriter, 1500);
    
    // 粒子效果
    setInterval(createParticle, 300);
    
    // 鼠標追蹤光效
    document.addEventListener('mousemove', (e) => {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00ff88, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 20;
            opacity: 0.3;
            pointer-events: none;
        `;
        
        document.body.appendChild(glow);
        
        glow.animate([
            { transform: 'scale(1)', opacity: 0.3 },
            { transform: 'scale(1.5)', opacity: 0 }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => glow.remove();
    });
});
