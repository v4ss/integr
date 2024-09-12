import { ethers } from "./ethers-6.0.esm.min.js";
import { factoryAddress, factoryAbi } from "./constants.js";
import "./ajax-jquery.min.js";

// Initialisation du bool de connexion
let connected = false;

const connectButton = document.getElementById("connectButton");
const welcomeDescription = document.getElementById("welcome");
const searchContainer = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

connectButton.onclick = connexionManagement;
searchButton.onclick = performSearch;

// Fonction pour vérifier si on est connecté à Sepolia
async function checkNetwork() {
    // Check Sepolia Network
    // Créer une instance du fournisseur Ethereum avec MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const { name } = await provider.getNetwork();
    if (name != "sepolia") {
        alert(
            "Pour faire les challenges, merci de vous connecter au réseau de test Sepolia",
        );
        console.error(
            "Pour faire les challenges, merci de vous connecter au réseau de test Sepolia",
        );
        return false;
    } else {
        return true;
    }
}

function displayButtonManagement(connexionState) {
    if (connexionState) {
        searchContainer.classList.remove("hide");
        welcomeDescription.classList.add("hide");
    } else {
        searchContainer.classList.add("hide");
        welcomeDescription.classList.remove("hide");
    }
}

// Fonction pour se connecter au wallet MetaMask
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Demander à l'utilisateur l'autorisation de se connecter à MetaMask
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // Créer une instance du fournisseur Ethereum avec MetaMask
            const provider = new ethers.BrowserProvider(window.ethereum);
            // Renvoyer l'adresse du compte connecté
            const signer = await provider.getSigner();
            // Check si sur Sepolia Network
            const sepolia = await checkNetwork();
            if (sepolia == false) {
                return 0;
            }
            // Update du bouton de connexion
            connectButton.innerHTML = `Connected to ${signer.address.slice(0, 6)}...${signer.address.slice(signer.address.length - 4)}`;
            // connected passe donc a TRUE
            connected = true;

            // Gestion affichage des buttons selon connexion wallet
            displayButtonManagement(connected);

            return signer.address;
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            throw error;
        }
    } else {
        connectButton.innerHTML = "Please install Metamask";
    }
}

// Fonction pour déconnecter le wallet
function disconnectWallet() {
    if (window.ethereum) {
        // Déconnexion du wallet
        connected = false;
        connectButton.innerHTML = "Connect";
        // Gestion affichage des buttons selon connexion wallet
        displayButtonManagement(connected);
    } else {
        connectButton.innerHTML = "Please install Metamask";
    }
}

// Fonction pour gérer la connexion au niveau du bouton Connect
async function connexionManagement() {
    const softwareList = document.getElementById("softwareList");
    softwareList.innerHTML = ""; // Vider la liste
    if (connected) {
        await disconnectWallet();
    } else if (!connected) {
        await connectWallet();
    }
}

// Fonction pour créer une nouvelle instance avec la factory
async function createInstance() {
    // Check si Sepolia Network
    const sepolia = await checkNetwork();
    if (sepolia == false) {
        return 0;
    }
    try {
        const signer = await getSigner();
        const factoryContract = new ethers.Contract(
            factoryAddress,
            factoryAbi,
            signer,
        );
        // Appeler la fonction createInstance() sur la factory pour créer une nouvelle instance
        const transaction = await factoryContract.createInstance();
        await transaction.wait();
        // Appeler la fonction getMyContract() pour récupérer l'adresse de l'instance
        const instanceAddress = await factoryContract.getMyInstance();
        instanceAddressText.innerHTML = instanceAddress;
        console.log(`Nouvelle instance créée à l'adresse : ${instanceAddress}`);
    } catch (error) {
        console.error("Erreur lors de la création de l'instance : ", error);
    }
}

async function performSearch() {
    const searchTerm = document.getElementById("searchBar").value;
    const softwares = await fetchAllSoftwares();
    const searchResults = searchSoftwares(softwares, searchTerm);
    displayResults(searchResults);
}

function displayResults(results) {
    const softwareList = document.getElementById("softwareList");
    softwareList.innerHTML = ""; // Vider la liste

    results.forEach((software) => {
        const listItem = document.createElement("li");
        listItem.classList.add("software-item", "collapsed");
        listItem.innerHTML = `
            <div class="software-header">
                <span><span class="title">${software.name}</span><span class="other"> - version ${software.version} - hash : ${software.hash}</span></span>
            </div>
            <div class="software-details">
                <p>Nom: ${software.name}</p>
                <p>Version: ${software.version}</p>
                <p>Hash: ${software.hash}</p>
                <p>Description: ${software.description}</p>
                <p>Éditeur: ${software.publisher}</p>
                <p>Soumis par: ${software.submitter}</p>
                <p>Lien de téléchargement: <a href="${software.downloadLinks}" target="_blank">${software.downloadLinks}</a></p>
                <!-- Zone de drag & drop -->
                <div class="drag-drop-zone">Déposez votre fichier ici</div>
                <div class="hash-status-container">
                    <span class="hash-status success">✔</span>
                    <span class="hash-status error">✘</span>
                </div>
            </div>
        `;

        softwareList.appendChild(listItem);

        // Gestion de l'extension/contraction
        const softwareHeader = listItem.querySelector(".software-header");
        const details = listItem.querySelector(".software-details");
        softwareHeader.onclick = () => {
            const expanded = listItem.classList.contains("expanded");
            listItem.classList.toggle("expanded");
            listItem.classList.toggle("collapsed");
            details.classList.toggle("show");
        };

        // Gestion du Drag & Drop
        const dropZone = listItem.querySelector(".drag-drop-zone");
        const successIcon = listItem.querySelector(".hash-status.success");
        const errorIcon = listItem.querySelector(".hash-status.error");

        dropZone.ondragover = (e) => e.preventDefault();
        dropZone.ondrop = async (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
                const fileHash = await calculateFileHash(file);
                if (fileHash === software.hash) {
                    successIcon.style.display = "inline";
                    errorIcon.style.display = "none";
                } else {
                    successIcon.style.display = "none";
                    errorIcon.style.display = "inline";
                }
            }
        };
    });
}

// Fonction pour calculer le hash d'un fichier (SHA-256)
async function calculateFileHash(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    console.log(hashHex);
    return hashHex;
}

// Utilisation de la fonction fetchAllSoftwares (exemple simple, dépend du smart contract)
async function fetchAllSoftwares() {
    const signer = await getSigner();
    const contract = new ethers.Contract(
        factoryAddress, // Adresse du smart contract
        factoryAbi, // ABI du smart contract
        signer,
    );

    try {
        const softwares = await contract.getAllSoftwares();
        return softwares;
    } catch (error) {
        console.error("Erreur lors de la récupération des logiciels :", error);
    }
}

// Fonction de recherche
function searchSoftwares(softwares, searchTerm) {
    return softwares.filter(
        (software) =>
            software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            software.hash.toLowerCase().includes(searchTerm.toLowerCase()),
    );
}

// // Fonction pour afficher les résultats
// function displayResults(results) {
//     const softwareList = document.getElementById("softwareList");
//     softwareList.innerHTML = ""; // Vider la liste

//     if (results.length === 0) {
//         const noResults = document.createElement("p");
//         noResults.textContent = "Aucun logiciel trouvé.";
//         softwareList.appendChild(noResults);
//         return;
//     }

//     results.forEach((software) => {
//         // Créer le conteneur principal
//         const softwareItem = document.createElement("div");
//         softwareItem.classList.add("software-item", "collapsed");

//         // Créer l'en-tête (toujours visible)
//         const softwareHeader = document.createElement("div");
//         softwareHeader.classList.add("software-item-header");

//         // Nom et version du logiciel
//         const softwareTitle = document.createElement("h4");
//         softwareTitle.textContent = `${software.name} - version ${software.version}`;

//         // Hash du logiciel
//         const softwareHash = document.createElement("p");
//         softwareHash.textContent = `Hash: ${software.hash}`;

//         // Ajouter le titre et le hash à l'en-tête
//         softwareHeader.appendChild(softwareTitle);
//         softwareHeader.appendChild(softwareHash);

//         // Créer le contenu supplémentaire (caché par défaut)
//         const softwareContent = document.createElement("div");
//         softwareContent.classList.add("software-item-content");

//         // Éditeur
//         const publisher = document.createElement("p");
//         publisher.textContent = `Éditeur : ${software.publisher}`;

//         // Description
//         const description = document.createElement("p");
//         description.textContent = `Description : ${software.description}`;

//         // Liens de téléchargement
//         const downloadLinks = document.createElement("p");
//         downloadLinks.innerHTML = `Liens de téléchargement : <a href="${software.downloadLinks}" target="_blank">${software.downloadLinks}</a>`;

//         const submitterP = document.createElement("p");
//         submitterP.textContent = `Soumis par: ${software.submitter}`;

//         // Ajouter les éléments au contenu
//         softwareContent.appendChild(publisher);
//         softwareContent.appendChild(description);
//         softwareContent.appendChild(downloadLinks);
//         softwareContent.appendChild(submitterP);

//         // Ajouter l'en-tête et le contenu au conteneur principal
//         softwareItem.appendChild(softwareHeader);
//         softwareItem.appendChild(softwareContent);

//         // Gérer le clic pour étendre/réduire
//         softwareHeader.addEventListener("click", () => {
//             if (softwareItem.classList.contains("collapsed")) {
//                 softwareItem.classList.remove("collapsed");
//                 softwareItem.classList.add("expanded");
//             } else {
//                 softwareItem.classList.remove("expanded");
//                 softwareItem.classList.add("collapsed");
//             }
//         });

//         // Ajouter l'élément à la liste
//         softwareList.appendChild(softwareItem);
//     });
// }

// Fonction utilitaire pour récupérer le signer
async function getSigner() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
}

// Connexion du wallet lors du chargement de la page
// window.addEventListener("load", async () => {
//     try {
//         displayButtonManagement(connected);
//         await displayInstanceManagement();
//         if (!connected) {
//             const connectedAddress = await connectWallet();
//         }
//     } catch (error) {
//         console.error("Error connecting to wallet:", error);
//     }
// });
