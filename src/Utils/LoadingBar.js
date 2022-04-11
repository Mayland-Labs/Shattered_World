import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import stylesLoading from '../Styles/Loading.module.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import React, { useState, useEffect } from 'react';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { useGLTF, Loader } from '@react-three/drei'
import Forest from "../World/Tiles/Forest";
import { gsap } from 'gsap'

function LoadingBar(props) {
    const [barProgres, setBarProgres] = useState({ num: 0 })
    const [effect, setEffect] = useState(true)
    const [lastLoaded, setLastLoaded] = useState()

    useEffect(() => {
        
        const sources = props.sources;
        console.log("sources", sources)

        sources.forEach(source => {
            switch (source.type) {
                case "GLTF Draco Model":
                    let model = useGLTF.preload(source.path)
                    console.log("MODEL", model);
                    break;
            }
        });

        const loadingBarBackground = document.querySelector('.loadingBackground')

        const loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                // Wait a little
                window.setTimeout(() => {
                    // Animate overlay

                    // Update loadingBarElement

                    setEffect(false);

                    gsap.to(loadingBarBackground, { duration: 3, opacity: 0, delay: 3 })
                    gsap.to(loadingBarBackground, { duration: 1, display: "none", delay: 5 })
                }, 500)
                props.assetHandler(newItems);

            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                // Calculate the progress and update the loadingBarElement
                // console.log(itemsLoaded, itemsTotal)
                const progressRatio = itemsLoaded / itemsTotal
                console.log("LAST ITEM LOADED:", itemUrl)
                // console.log(progressRatio)
                setLastLoaded(itemUrl)
                setBarProgres({ ...barProgres, num: progressRatio * 100 })
            }
        )

        const loaders = {}
        loaders.cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
        loaders.gltfLoader = new GLTFLoader(loadingManager)
        loaders.textureLoader = new THREE.TextureLoader(loadingManager)
        loaders.gltfDracoLoader = new DRACOLoader(loadingManager);
        loaders.fbxLoader = new FBXLoader();
        loaders.gltfDracoLoader.setDecoderPath('/draco/');
        loaders.gltfLoader.setDRACOLoader(loaders.gltfDracoLoader)

        let newItems = {};

        sources.forEach(source => {
            switch (source.type) {
                case "cubeTexture":
                    loaders.cubeTextureLoader.load(
                        source.path,
                        (file) => {
                            // items[source.category][source.name] = file;
                            archiver(source, file)
                        }
                    )
                    break;
                case "GLTF Draco Model":
                    loaders.gltfLoader.load(
                        source.path,
                        (file) => {
                            // console.log("FILE", file)
                            // items[source.category][source.name] = file;
                            archiver(source, file)
                        }
                    )
                    break;
            }
        });

        const archiver = (source, file) => {
            if (newItems[source.category] == undefined) {
                newItems[source.category] = {};
            }

            newItems[source.category][source.name] = file;
        }
    }, []);


    const styleCrystal = {
        height: `${50 - (0.5 * barProgres.num)}vh`
    };

    return (
        <div className="loadingBackground">
            <div className={stylesLoading.logoContainer}>
                <img class={stylesLoading[`${effect ? 'logo' : 'logoActive'}`]} src='logo.png' alt='Logo' />
                <img class={stylesLoading[`${effect ? 'crystal' : 'crystalActive'}`]} src='./LoadingBar/crystal.png' alt='Crystal' />
                <h1>{lastLoaded + "     " + barProgres.num}</h1>
                <div style={styleCrystal} class={stylesLoading.crystalGray}></div>
            </div>
        </div>
    );


}

export default LoadingBar;