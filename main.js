// Engrenagens 3D no topo da página (Three.js) e inclinação 3D dos cards.
(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- engrenagens ---------- */
    function startGears() {
        const canvas = document.getElementById('gears');
        if (!canvas || typeof THREE === 'undefined') return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        } catch (e) {
            canvas.remove();
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, 14);

        scene.add(new THREE.AmbientLight(0x6f7fb8, 0.55));
        const keyLight = new THREE.PointLight(0x4fd1e8, 1.6, 40);
        keyLight.position.set(-6, 5, 8);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0xffb547, 1.2, 40);
        rimLight.position.set(7, -4, 6);
        scene.add(rimLight);

        const MODULE = 0.22; // tamanho do dente

        function gearShape(teeth) {
            const pitch = (MODULE * teeth) / 2;
            const outer = pitch + MODULE;
            const root = pitch - 1.25 * MODULE;
            const shape = new THREE.Shape();
            const step = (Math.PI * 2) / teeth;
            for (let i = 0; i < teeth; i++) {
                const a = i * step;
                const pts = [
                    [root, a],
                    [outer, a + step * 0.18],
                    [outer, a + step * 0.42],
                    [root, a + step * 0.6],
                ];
                pts.forEach(([r, ang], j) => {
                    const x = Math.cos(ang) * r;
                    const y = Math.sin(ang) * r;
                    if (i === 0 && j === 0) shape.moveTo(x, y);
                    else shape.lineTo(x, y);
                });
                shape.absarc(0, 0, root, a + step * 0.6, a + step, false);
            }
            const hole = new THREE.Path();
            hole.absarc(0, 0, pitch * 0.32, 0, Math.PI * 2, true);
            shape.holes.push(hole);
            // furos de alívio
            const spokes = teeth >= 16 ? 5 : 0;
            for (let s = 0; s < spokes; s++) {
                const ang = (s / spokes) * Math.PI * 2;
                const p = new THREE.Path();
                p.absarc(Math.cos(ang) * pitch * 0.62, Math.sin(ang) * pitch * 0.62, pitch * 0.15, 0, Math.PI * 2, true);
                shape.holes.push(p);
            }
            return { shape, pitch };
        }

        function makeGear(teeth, color) {
            const { shape, pitch } = gearShape(teeth);
            const geo = new THREE.ExtrudeGeometry(shape, {
                depth: 0.45,
                bevelEnabled: true,
                bevelThickness: 0.06,
                bevelSize: 0.04,
                bevelSegments: 2,
                curveSegments: 10,
            });
            geo.center();
            const mesh = new THREE.Mesh(
                geo,
                new THREE.MeshStandardMaterial({ color: 0x18224a, metalness: 0.75, roughness: 0.35 })
            );
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(geo, 25),
                new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 })
            );
            const group = new THREE.Group();
            group.add(mesh, edges);
            group.userData = { teeth, pitch };
            return group;
        }

        const rig = new THREE.Group();
        scene.add(rig);

        // três engrenagens engrenadas: a menor gira mais rápido
        const a = makeGear(20, 0x4fd1e8);
        const b = makeGear(12, 0xffb547);
        const c = makeGear(28, 0x4fd1e8);

        const angB = -0.35;
        const angC = 2.2;
        const dAB = a.userData.pitch + b.userData.pitch;
        const dAC = a.userData.pitch + c.userData.pitch;
        b.position.set(Math.cos(angB) * dAB, Math.sin(angB) * dAB, 0);
        c.position.set(Math.cos(angC) * dAC, Math.sin(angC) * dAC, -0.6);

        // alinha os dentes no ponto de contato
        const offB = Math.PI / b.userData.teeth + angB * (1 + a.userData.teeth / b.userData.teeth);
        const offC = Math.PI / c.userData.teeth + angC * (1 + a.userData.teeth / c.userData.teeth);

        rig.add(a, b, c);
        rig.position.set(1.2, 0.4, 0);
        rig.rotation.set(-0.45, -0.55, 0.1);

        // eixo luminoso atravessando a engrenagem principal
        const shaft = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.12, 3.2, 24),
            new THREE.MeshBasicMaterial({ color: 0x4fd1e8, transparent: true, opacity: 0.35 })
        );
        shaft.rotation.x = Math.PI / 2;
        a.add(shaft);

        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        window.addEventListener('pointermove', (e) => {
            pointer.x = e.clientX / window.innerWidth - 0.5;
            pointer.y = e.clientY / window.innerHeight - 0.5;
        }, { passive: true });

        function resize() {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.position.z = w < 700 ? 12.5 : (w / h < 0.9 ? 21 : 17.5);
            rig.position.x = w < 700 ? -0.2 : 1.2;
            camera.updateProjectionMatrix();
        }
        window.addEventListener('resize', resize);
        resize();

        let theta = 0.4;
        let visible = true;
        new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);

        function frame() {
            if (!reduceMotion) theta += 0.006;
            a.rotation.z = theta;
            b.rotation.z = -theta * (a.userData.teeth / b.userData.teeth) + offB;
            c.rotation.z = -theta * (a.userData.teeth / c.userData.teeth) + offC;

            target.x += (pointer.x - target.x) * 0.05;
            target.y += (pointer.y - target.y) * 0.05;
            rig.rotation.y = -0.55 + target.x * 0.6;
            rig.rotation.x = -0.45 + target.y * 0.4;

            renderer.render(scene, camera);
        }

        function loop() {
            if (visible) frame();
            requestAnimationFrame(loop);
        }

        if (reduceMotion) {
            frame();
            window.addEventListener('resize', frame);
        } else {
            loop();
        }
    }

    /* ---------- inclinação 3D dos cards ---------- */
    function startTilt() {
        if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        document.querySelectorAll('[data-tilt]').forEach((el) => {
            const max = el.classList.contains('module') ? 8 : 6;
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                el.classList.add('is-tilting');
                el.style.transform =
                    `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(6px)`;
            });
            el.addEventListener('pointerleave', () => {
                el.classList.remove('is-tilting');
                el.style.transform = '';
            });
        });
    }

    startGears();
    startTilt();
})();
