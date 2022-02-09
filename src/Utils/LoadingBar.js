import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import stylesLoading from '../Styles/Loading.module.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap'
import { Raycaster } from 'three'

function LoadingBar(src) {
    const [stop, setStop] = useState(true)
    const [barProgres, setBarProgres] = useState({ num: 0 })
    const [effect, setEffect] = useState(true)
    const [items, setItems] = useState({})

    // useEffect(() => {
    //     console.log("ITEMS", items);
    // },[items])

    useEffect(() => {
        let sceneReady = false;

        const sources = src["sources"];

        let toLoad = sources.length;
        let loaded = 0;

        const loadingBarBackground = document.querySelector('.loadingBackground')

        const loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                // Wait a little
                window.setTimeout(() => {
                    // Animate overlay

                    sceneReady = true;

                    // Update loadingBarElement

                    setEffect(false);

                    console.log("sadasdadadadsada")
                    gsap.to(loadingBarBackground, { duration: 3, opacity: 0, delay: 3 })
                    gsap.to(loadingBarBackground, { duration: 1, display: "none", delay: 5 })
                }, 500)
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                // Calculate the progress and update the loadingBarElement
                // console.log(itemsLoaded, itemsTotal)
                const progressRatio = itemsLoaded / itemsTotal

                console.log(progressRatio)
                setBarProgres({ ...barProgres, num: progressRatio * 100 })
            }
        )



        const loaders = {}
        loaders.cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
        loaders.gltfLoader = new GLTFLoader(loadingManager)
        loaders.textureLoader = new THREE.TextureLoader(loadingManager)

        sources.forEach(source => {
            if (source.type == "cubeTexture") {
                loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        // items[source.name] = file;
                        setItems({...items, [source.name]: file})
                    }
                )
            }
        });

        console.log("SOURCES", sources)

    }, []);

    const styleCrystal = {
        height:  `${ 50 -(0.5  *barProgres.num)}vh`
    };

    return (
        <div className="loadingBackground">
            <div className={stylesLoading.logoContainer}>
                <img class={stylesLoading[`${effect ? 'logo' : 'logoActive'}`]} src='logo.png' alt='Logo' />
                <img class={stylesLoading[`${effect ? 'crystal' : 'crystalActive'}`]} src='./LoadingBar/crystal.png' alt='Crystal' />
                <div style={styleCrystal} class={stylesLoading.crystalGray}></div>
            </div>
        </div>
    );
};

export default LoadingBar;