'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Facebook, Youtube, Mail, Send, Globe, Cpu, Zap, Battery, Clock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type CommandOutput = {
    command: string;
    output: React.ReactNode;
};

type Language = 'en' | 'vi';

const translations = {
    en: {
        welcome: <span>Welcome to Le Quyen&apos;s System Interface. Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to initialize connection.</span>,
        helpTitle: 'Available commands:',
        role: 'IT System',
        status: '🟢 Active (Uptime 99.99%)',
        session: 'tty1',
        bio: "Hi there, I'm QuyenLT.\n\nI'm passionate about IT Systems. My work revolves around 'keeping the beat' for computer systems and servers to ensure smooth operation. From configuring servers and network security to troubleshooting issues on various operating systems, I always look for the most optimal and intelligent solutions.\n\nWebsite quyenlt.com is where I share my practical hands-on experience in the System profession, with the aim of making complex techniques simpler and more accessible to everyone.",
        cmds: {
            about: '// System Administrator Bio',
            stack: '// View Core Technologies',
            smm: '// Social Media Marketing',
            contact: '// Connection Protocols',
            clear: '// Clear Buffer',
            lang: '// Switch Language (lang vi/en)'
        },
        smm: {
            title: 'Social Media Marketing',
            desc: "Fast & Automated Interaction Growth.\n\nProviding high-quality Facebook, Instagram, TikTok, YouTube services at the cheapest market prices."
        },
        projects: {
            p1: { title: 'Hybrid Cloud Migration', status: 'COMPLETED', desc: 'Migrated Mission-Critical DBs to AWS RDS. Reduced latency by 40%.' },
            p2: { title: 'Security Hardening', status: 'ACTIVE', desc: 'Deployed centralized IAM & MFA across 50+ Nodes.' }
        },
        contact: { email: 'Email', facebook: 'Facebook', telegram: 'Telegram', youtube: 'Youtube' },
        notFound: 'Err: command not found:',
        user: 'User'
    },
    vi: {
        welcome: <span>Chào mừng tới với giao diện Info Profile của Mình, để biết thêm về mình, mọi người gõ <span className="text-emerald-400 font-bold">&apos;help&apos;</span> hoặc <span className="text-emerald-400 font-bold">&apos;ls&apos;</span> để xem nhé!</span>,
        helpTitle: 'Các lệnh khả dụng:',
        role: 'IT System',
        status: '🟢 Active (Uptime 99.99%)',
        session: 'tty1',
        bio: "Chào bạn, mình là QuyenLT.\n\nMình là một người đam mê IT System. Công việc của mình xoay quanh việc 'giữ nhịp' cho các hệ thống máy tính và máy chủ hoạt động trơn tru. Từ việc cấu hình server, bảo mật mạng cho đến xử lý các sự cố trên mọi hệ điều hành, mình luôn tìm kiếm những cách làm tối ưu và thông minh nhất.\n\nWebsite quyenlt.com là nơi mình chia sẻ những kinh nghiệm thực chiến trong nghề System, với mong muốn biến những kỹ thuật phức tạp trở nên đơn giản và dễ tiếp cận hơn cho mọi người.",
        cmds: {
            about: '// Giới thiệu cá nhân',
            stack: '// Công nghệ sử dụng',
            smm: '// Social Media Marketing',
            contact: '// Thông tin liên hệ',
            clear: '// Xóa màn hình',
            lang: '// Đổi ngôn ngữ (lang vi/en)'
        },
        smm: {
            title: 'Social Media Marketing',
            desc: "Tăng tương tác nhanh & Tự động\n\nCung cấp các dịch vụ Facebook, Instagram, TikTok, YouTube chất lượng cao với giá rẻ nhất thị trường."
        },
        projects: {
            p1: { title: 'Di dời Hybrid Cloud', status: 'HOÀN THÀNH', desc: 'Di chuyển các DB quan trọng lên AWS RDS. Giảm độ trễ 40%.' },
            p2: { title: 'Tăng cường Bảo mật', status: 'ĐANG CHẠY', desc: 'Triển khai IAM & MFA tập trung trên hơn 50 Node Server.' }
        },
        contact: { email: 'Email', facebook: 'Facebook', telegram: 'Telegram', youtube: 'Youtube' },
        notFound: 'Lỗi: không tìm thấy lệnh:',
        user: 'Người dùng'
    }
};

const Terminal = () => {
    const [history, setHistory] = useState<CommandOutput[]>([]);
    const [input, setInput] = useState('');
    const [lang, setLang] = useState<Language>('vi'); // Default to Vietnamese as requested contextually
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const t = translations[lang];

    useEffect(() => {
        setMounted(true);
        inputRef.current?.focus();
        // Simulate initial welcome
        setTimeout(() => {
            setHistory([
                { command: '', output: <div className="mb-4 text-zinc-400 pt-2">{t.welcome}</div> }
            ]);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update welcome message if language changes and history is empty (optional, but good for UX if user toggles immediately)
    // Actually, we usually just let the next commands reflect the language.

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleContainerClick = () => {
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            inputRef.current?.focus();
        }
    };


    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const args = trimmedCmd.split(' ');
        const mainCmd = args[0];

        let output: React.ReactNode;

        switch (mainCmd) {
            case 'help':
            case 'ls':
                output = (
                    <div className="grid grid-cols-1 gap-1 text-zinc-300 ml-2 mt-2 border-l-2 border-zinc-700 pl-4 font-mono text-sm">
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">about</span>  <span className="text-zinc-500">{t.cmds.about}</span></div>
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">stack</span>  <span className="text-zinc-500">{t.cmds.stack}</span></div>
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">smm</span>    <span className="text-zinc-500">{t.cmds.smm}</span></div>
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">contact</span>  <span className="text-zinc-500">{t.cmds.contact}</span></div>
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">lang</span>  <span className="text-zinc-500">{t.cmds.lang}</span></div>
                        <div className="flex gap-4"><span className="text-emerald-400 w-24">clear</span>  <span className="text-zinc-500">{t.cmds.clear}</span></div>
                    </div>
                );
                break;

            case 'about':
                output = (
                    <div className="mt-2 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <div className="flex flex-col gap-1 text-zinc-300 font-mono text-sm">
                            <div><span className="text-emerald-400 font-bold">[User]:</span> Lê Quyền</div>
                            <div><span className="text-emerald-400 font-bold">[Role]:</span> {t.role}</div>
                            <div><span className="text-emerald-400 font-bold">[Status]:</span> {t.status}</div>
                        </div>
                        <div className="mt-4 text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                            {t.bio}
                        </div>
                    </div>
                );
                break;

            case 'stack':
                output = (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {['Linux (RHEL)', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Ansible', 'Bash', 'Python', 'Nginx', 'PostgreSQL'].map(item => (
                            <span key={item} className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700 text-xs font-mono">{item}</span>
                        ))}
                    </div>
                );
                break;

            case 'smm':
                output = (
                    <div className="mt-2 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <h3 className="text-lg font-bold text-pink-500 mb-2">{t.smm.title}</h3>
                        <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-line mb-3">
                            {t.smm.desc}
                        </p>
                        <a href="https://smm.quyenlt.com/" target="_blank" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group" rel="noreferrer">
                            <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                            <span className="underline decoration-dotted underline-offset-4">smm.quyenlt.com</span>
                        </a>
                    </div>
                );
                break;

            case 'contact':
                output = (
                    <div className="ml-2 mt-2 text-sm space-y-2">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-zinc-500" />
                            <span className="text-zinc-400 w-20">{t.contact.email}:</span>
                            <span className="text-zinc-200 select-all">quyenle.10082000@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Facebook size={16} className="text-blue-500" />
                            <span className="text-zinc-400 w-20">{t.contact.facebook}:</span>
                            <a href="https://www.facebook.com/NejiHoangDe.org/" target="_blank" className="text-blue-400 underline hover:text-blue-300" rel="noreferrer">facebook.com/NejiHoangDe.org</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Send size={16} className="text-sky-400" />
                            <span className="text-zinc-400 w-20">{t.contact.telegram}:</span>
                            <a href="https://t.me/fbtobi" target="_blank" className="text-sky-400 underline hover:text-sky-300" rel="noreferrer">t.me/fbtobi</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Youtube size={16} className="text-red-500" />
                            <span className="text-zinc-400 w-20">{t.contact.youtube}:</span>
                            <a href="https://www.youtube.com/@NejiHoangdeChannel" target="_blank" className="text-red-400 underline hover:text-red-300" rel="noreferrer">youtube.com/@NejiHoangdeChannel</a>
                        </div>
                    </div>
                )
                break;

            case 'lang':
                if (args[1] === 'vi' || args[1] === 'vn') {
                    setLang('vi');
                    output = <span className="text-emerald-500">Ngôn ngữ đã chuyển sang Tiếng Việt.</span>;
                } else if (args[1] === 'en') {
                    setLang('en');
                    output = <span className="text-emerald-500">Language switched to English.</span>;
                } else {
                    output = <span className="text-yellow-500">Usage: lang [vi|en]</span>;
                }
                break;

            case 'clear':
                setHistory([]);
                return;

            case '':
                output = null;
                break;

            default:
                output = <span className="text-red-500 text-sm">{t.notFound} {trimmedCmd}</span>;
        }

        if (trimmedCmd) {
            setHistory(prev => [...prev, { command: cmd, output }]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    const toggleLang = () => {
        const newLang = lang === 'vi' ? 'en' : 'vi';
        setLang(newLang);
        setHistory(prev => [...prev, {
            command: '',
            output: <span className="text-zinc-500 italic text-xs mb-2">
                System message: Language switched to {newLang === 'vi' ? 'Vietnamese' : 'English'}
            </span>
        }]);
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 md:p-8 font-sans bg-[#121212]">

            {/* Main Wrapper for Animation - Fixes Clipping Issue */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-6xl h-[80vh] md:h-[720px] relative z-0"
            >
                {/* Cute Anime Character Walking Animation */}
                <motion.div
                    className="absolute -top-28 left-0 z-20"
                    animate={{
                        x: ["0%", "calc(100% - 128px)", "calc(100% - 128px)", "0%", "0%"],
                        scaleX: [1, 1, -1, -1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.45, 0.5, 0.95, 1]
                    }}
                >
                    {/* Placeholder Anime GIF - Capoo or similar cute character */}
                    <div className="w-32 h-32 relative drop-shadow-lg">
                        <Image
                            src="https://file.playerduo.net/production/images/donate_gif/0.gif"
                            alt="Running Character"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </motion.div>


                {/* Main "Window" Container - Classic macOS Terminal Style */}
                <div
                    className="w-full h-full bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-[#333] flex flex-col relative"
                    onClick={handleContainerClick}
                >
                    {/* Window Header (Title Bar) */}
                    <div className="h-9 bg-[#2e2e2e] flex items-center justify-between px-4 select-none relative shadow-sm border-b border-[#1a1a1a] z-20">
                        {/* Left: Window Controls (Traffic Lights) */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-110"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-110"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-110"></div>
                        </div>

                        {/* Center: Title */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-90">
                            <span className="text-lg text-zinc-400 font-script tracking-wider">Profile QuyenLT</span>
                        </div>

                        {/* Right: Language Toggle */}
                        <div className="flex items-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleLang(); }}
                                className="flex items-center gap-1.5 px-2 py-0.5 bg-[#3e3e3e] hover:bg-[#4e4e4e] rounded border border-[#555] transition-colors cursor-pointer group"
                            >
                                <span className={`text-[10px] font-bold ${lang === 'vi' ? 'text-emerald-400' : 'text-zinc-400'}`}>VI</span>
                                <span className="text-zinc-600 text-[10px]">|</span>
                                <span className={`text-[10px] font-bold ${lang === 'en' ? 'text-emerald-400' : 'text-zinc-400'}`}>EN</span>
                            </button>
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 bg-[#1e1e1e]/95 overflow-y-auto p-4 md:p-6 font-mono text-sm space-y-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">

                        {/* Welcome / Info Block - Customized Style */}
                        <div className="mb-6 pb-2 border-b border-[#333]/50 font-mono">
                            {/* System Stats Bar */}
                            <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-zinc-500 mb-6 font-bold select-none">
                                <div className="flex items-center gap-1.5">
                                    <Cpu size={14} className="text-emerald-500" />
                                    <span className="text-zinc-300">5%</span>
                                    <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="w-[10%] h-full bg-emerald-500"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Zap size={14} className="text-yellow-500" />
                                    <span className="text-zinc-300">11 GB</span>
                                    <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="w-[40%] h-full bg-yellow-500"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Battery size={14} className="text-blue-500" />
                                    <span className="text-zinc-300">43%</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5 text-pink-500">
                                    <Clock size={14} />
                                    <span>{mounted ? new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : '--:--'}</span>
                                    <span className="hidden md:inline text-zinc-600">|</span>
                                    <span className="hidden md:inline text-zinc-400">{mounted ? new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }) : '--/--'}</span>
                                </div>
                            </div>

                            {/* ASCII Art Layout */}
                            <div className="flex flex-col gap-1 select-none pointer-events-none">
                                {/* Name Gradient */}
                                <pre className="font-bold leading-[1.1] bg-gradient-to-b from-green-400 via-yellow-400 to-red-500 text-transparent bg-clip-text text-[10px] sm:text-xs md:text-sm overflow-x-hidden">
                                    {`   ____  _   _ __   __  ______  _   _  _    _______
  / __ \\| | | |\\ \\ / / |  ____|| \\ | || |  |__   __|
 | |  | | | | | \\ V /  | |__   |  \\| || |     | |   
 | |  | | | | |  | |   |  __|  | . \` || |     | |   
 | |__| | |_| |  | |   | |____ | |\\  || |____ | |   
  \\___\\_\\\\___/   |_|   |______||_| \\_||______||_|   `}
                                </pre>

                                {/* Quote Box & Cow */}
                                <div className="mt-4 text-emerald-500 text-[11px] sm:text-xs leading-relaxed">
                                    <pre className="mb-2 whitespace-pre-wrap font-sans">
                                        {`❝ ♥ Sống ở đời phải biết mình là ai. Hơn thua được gì ❗ 

=========Tobi==========

Admin : quyenlt.com 
Admin : smm.quyenlt.com`}
                                    </pre>

                                    <div className="pl-8 sm:pl-12 opacity-90 mt-2 relative w-40 md:w-48 h-32">
                                        <Image
                                            src="/hacker.png"
                                            alt="Hacker"
                                            fill
                                            className="object-contain grayscale brightness-125 contrast-125 select-none pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-zinc-500 text-xs italic">
                                Type <span className="text-emerald-500">&apos;help&apos;</span> to initialize key commands.
                            </p>
                        </div>

                        {/* History */}
                        {history.map((entry, i) => (
                            <div key={i} className="space-y-1 group">
                                {entry.command && (
                                    <div className="flex gap-2 items-center">
                                        <span className="text-emerald-500 font-bold select-none">root@quyenlt:~$</span>
                                        <span className="text-zinc-100 font-medium">{entry.command}</span>
                                    </div>
                                )}
                                {entry.output && (
                                    <div className="pl-0 animate-in fade-in duration-200">
                                        {entry.output}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Input Area */}
                        <div className="flex gap-2 items-center min-h-[24px]" ref={bottomRef}>
                            <span className="text-emerald-500 font-bold select-none">root@quyenlt:~$</span>
                            <div className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border-none outline-none font-inherit text-zinc-100 placeholder-transparent z-10 relative"
                                    autoComplete="off"
                                    spellCheck="false"
                                    autoFocus
                                />
                                {/* Blinking Block Cursor */}
                                {!input && (
                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="absolute top-[2px] left-0 w-2.5 h-4 bg-zinc-400 pointer-events-none"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="h-12"></div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Terminal;
