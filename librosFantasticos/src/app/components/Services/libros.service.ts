import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private Libro:libro[]=[
    {
      nombre:"Harry Potter y la piedra Filosofal",
      autor:"J.K. Rowling",
      img:"../../../assets/img/harry_potter.jpeg",
      sinopsis:"El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort está en busca de una piedra filosofal que alarga la vida de quien la posee.",
    },
    {
      nombre:"La guía de la dama para las enaguas y la piratería",
      autor:"Mackenzie Lee",
      img:"../../../assets/img/Guia_dama.jpeg",
      sinopsis:"ERES FELICITY MONTAGUE. NO LE TIENES MIEDO A NADA. MERECES ESTAR AQUÍ. Un año después del accidentado Gran Tour de su hermano, Felicity tiene solo un objetivo en mente: entrar a la escuela de medicina. Sin embargo, su intelecto y su pasión nunca serán suficientes en un mundo de hombres. Hasta que surge una pequeña oportunidad en Alemania y, aunque no tiene un centavo para costear la aventura, está segura de que allí encontrará su destino. La suerte le sonríe cuando una misteriosa joven se ofrece a pagar el viaje siempre y cuando le permita acompañarla. Pero una vez que sus verdaderas intenciones se revelen, Felicity se verá envuelta en una peligrosa búsqueda que la sumergirá de lleno en uno de los más grandes secretos que ocultan las profundidades del océano.",
    },
    {
      nombre:"Cadena de Oro",
      autor:"Cassandra Clare",
      img:"../../../assets/img/CoG.jpeg",
      sinopsis:"Cordelia Carstairs es una cazadora de sombras, una guerrera entrenada desde la infancia para luchar contra los demonios. Cuando su padre es acusado de un crimen terrible, ella y su hermano viajan Londres Eduardiano con la esperanza de evitar la ruina de la familia. La madre de Cordelia quiere casarla, pero Cordelia está decidida a ser un héroe en lugar de una novia. Pronto Cordelia se encuentra con los amigos de la infancia James y Lucie Herondale y se ve arrastrada a su mundo de salones de baile relucientes, asignaciones secretas y salones sobrenaturales, donde vampiros y brujos se mezclan con sirenas y magos. Mientras tanto, ella debe ocultar su amor secreto por James, quien ha jurado casarse con otra persona. Pero la nueva vida de Cordelia se destruye cuando una impactante serie de ataques de demonios devastan Londres. Estos monstruos no se parecen en nada a aquellos que los cazadores de sombras han luchado antes, estos demonios caminan a la luz del día, derriban a los incautos con veneno incurable y parecen imposibles de matar. Londres se pone inmediatamente en cuarentena. Atrapadas en la ciudad, Cordelia y sus amigos descubren que su propia conexión con un legado oscuro les ha otorgado increíbles poderes, y obligan a una elección brutal que revelará el precio verdaderamente cruel de ser un héroe.",
    },
    {
      nombre:"La selección",
      autor:"Kiera Cass",
      img:"../../../assets/img/selección.jpeg",
      sinopsis:"Para treinta y cinco chicas, La Selección es una oportunidad que solo se presenta una vez en la vida. La oportunidad de escapar de la vida que les ha tocado por nacer en una determinada familia. La oportunidad de que las trasladen a un mundo de trajes preciosos y joyas que no tienen precio. La oportunidad de vivir en un palacio y de competir por el corazón del guapísimo príncipe Maxon. Sin embargo, para America Singer, ser seleccionada es una pesadilla porque significa alejarse de su amor secreto, Aspen, quien pertenece a una casta inferior a la de ella; y también abandonar su hogar para pelear por una corona que no desea y vivir en un palacio que está bajo la constante amenaza de ataques violentos por parte de los rebeldes.",
    },  
    {
      nombre:"La guía de caballero para obtener suerte",
      autor:"Mackenzie Lee",
      img:"../../../assets/img/guia_caballero.jpeg",
      sinopsis:"La gran gira épica de Monty puede haber terminado, pero ahora que él y Percy finalmente son una pareja, se da cuenta de que hay algo más estresante que ser perseguido por Europa: reunirse con la persona que amas. ¿El encanto romántico de Santorini hará que su primera vez con Percy sea mágica, o toda la anticipación y la acumulación arruinarán por completo el estado de ánimo?",
    },
    {
      nombre:"Code Red",
      autor:"Rekits",
      img:"../../../assets/img/code_red.png",
      sinopsis:"Proximamente",
    },
    {
      nombre:"Revelación",
      autor:"Rekits",
      img:"../../../assets/img/revelacion.jpg",
      sinopsis:"Proximamente",
    },
    {
      nombre:"La Elite",
      autor:"Rekits",
      img:"../../../assets/img/la elite.jpg",
      sinopsis:"Proximamente",
    },
    {
      nombre:"Before Anyone Alse",
      autor:"Rekits",
      img:"../../../assets/img/11_11.jpg",
      sinopsis:"Proximamente",
    },
    {
      nombre:"Before Anyone Alse",
      autor:"Rekits",
      img:"../../../assets/img/11_11.jpg",
      sinopsis:"Proximamente",
    }
 
 
  ]
    constructor() { }
    getLibros():libro[]{
      return this.Libro;
    }
  }
  
  export interface libro{
    nombre:string,
    autor:string,
    img:string,
    sinopsis:string,
  }