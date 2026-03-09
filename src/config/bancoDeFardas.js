import camisaImg from '../assets/images/fardas/camisa.jpg';
import calcoesImg from '../assets/images/fardas/calcoes.png';
import saiaImg from '../assets/images/fardas/saia.png';
import meiasImg from '../assets/images/fardas/meias.jpg';
import tshirtImg from '../assets/images/fardas/tshirt.jpg';
import sweatImg from '../assets/images/fardas/sweat.jpg';
import boinaImg from '../assets/images/fardas/boina.jpg';
import boneImg from '../assets/images/fardas/bone.jpg';
import calcasImg from '../assets/images/fardas/calcas.png';
import cintoImg from '../assets/images/fardas/cinto.jpg';
import jarreteirasImg from '../assets/images/fardas/jarreteiras.jpg';
import lencoImg from '../assets/images/fardas/lenco.jpg';
import mochilaImg from '../assets/images/fardas/mochila.png';
import sacoCamaImg from '../assets/images/fardas/saco_cama.jpg';
import isoladorImg from '../assets/images/fardas/isolador.jpg';
import pratoImg from '../assets/images/fardas/prato.jpg';
import canecaImg from '../assets/images/fardas/caneca.jpg';
import cantilImg from '../assets/images/fardas/cantil.jpg';
import talheresImg from '../assets/images/fardas/talheres.png';
import lanternaImg from '../assets/images/fardas/lanterna.jpg';

const standardSizes = ['XS', 'S', 'M', 'L', 'XL'];
const sockSizes = ['6(28-30)', '8(31-33)', '10(34-36)', '10.5(37-39)', '11(40-42)', '11.5(43-46)'];
const sectionSizes = ['Lobito', 'Explorador', 'Pioneiro', 'Caminheiro', 'Dirigente'];
const bagSizes = ['Pequena', 'Média', 'Grande'];
const plateSizes = ['Raso', 'Normal', 'Fundo'];

function buildStock(sizes, defaultQty = 0) {
  return sizes.map((size) => ({ size, qty: defaultQty }));
}

export const categories = [
  {
    key: 'uniforme',
    label: 'Peças do Uniforme',
    lastUpdated: '12.mar.2026',
    items: [
      { name: 'Camisas', image: camisaImg, stock: buildStock(standardSizes) },
      { name: 'Calções', image: calcoesImg, stock: buildStock(standardSizes) },
      { name: 'Saias', image: saiaImg, stock: buildStock(standardSizes) },
      { name: 'Meias', image: meiasImg, stock: buildStock(sockSizes) },
      { name: 'T-Shirt de Agrupamento', image: tshirtImg, stock: buildStock(standardSizes) },
      { name: 'Sweat de Agrupamento', image: sweatImg, stock: buildStock(standardSizes) },
      { name: 'Boinas', image: boinaImg, stock: buildStock(standardSizes) },
      { name: 'Bonés', image: boneImg, stock: buildStock(standardSizes) },
      { name: 'Calças', image: calcasImg, stock: buildStock(standardSizes) },
      { name: 'Cintos', image: cintoImg, stock: buildStock(standardSizes) },
      { name: 'Jarreteiras', image: jarreteirasImg, stock: buildStock(sectionSizes) },
      { name: 'Lenços', image: lencoImg, stock: buildStock(sectionSizes) },
    ],
  },
  {
    key: 'equipamentos',
    label: 'Outros Equipamentos',
    lastUpdated: '12.mar.2026',
    items: [
      { name: 'Mochilas', image: mochilaImg, stock: buildStock(bagSizes) },
      { name: 'Sacos-de-Cama', image: sacoCamaImg, stock: buildStock(['Pequeno', 'Médio', 'Grande']) },
      { name: 'Isoladores', image: isoladorImg, stock: buildStock(['Pequeno', 'Médio', 'Grande']) },
      { name: 'Pratos', image: pratoImg, stock: buildStock(plateSizes) },
      { name: 'Canecas', image: canecaImg, stock: buildStock(['Unidade']) },
      { name: 'Cantis', image: cantilImg, stock: buildStock(['Unidade']) },
      { name: 'Talheres', image: talheresImg, stock: buildStock(['Conjunto']) },
      { name: 'Lanternas', image: lanternaImg, stock: buildStock(['Unidade']) },
    ],
  },
];
