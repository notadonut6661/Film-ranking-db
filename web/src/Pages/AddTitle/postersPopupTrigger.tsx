interface PostersPopupTriggerProps {
   src: string;
   index: number;
}

export default function PostersPopupTrigger({src, index}: PostersPopupTriggerProps): JSX.Element {
   const showPopup = () => {
      const postersPopup = document.getElementById("posters-popup") as HTMLDivElement;
      postersPopup?.classList.add('showed');
      postersPopup?.classList.add(String(index));
   } 

   const triggerOnclickHandler = () => {
      showPopup();
   }

   return <button onClick={triggerOnclickHandler}>
      <img src={src} alt="" />
   </button>;
}
