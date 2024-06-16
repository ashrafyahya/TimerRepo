import { IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonList, IonModal, IonPage, IonRange, IonSelect, IonSelectOption, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { arrowBackOutline, settingsOutline, shareOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Share } from '@capacitor/share';

interface dataProps {
    setVibration: React.Dispatch<React.SetStateAction<boolean>>;
    setSound: React.Dispatch<React.SetStateAction<boolean>>;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    setSoundStrenght: React.Dispatch<React.SetStateAction<number>>;
}
export const SettingModal: React.FC<dataProps> = ({ setVibration, setColor, setSound, setSoundStrenght }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [soundChecked, setSoundChecked] = useState(true);
    const [soundStrenght, setSoundStrength] = useState<number>(1);
    const [colorChecked, setColorChecked] = useState<string>("Favorite color");
    const [soundTone, setSoundTone] = useState<string>("Favorite tone");
    const [showColor, setShowColor] = useState<string>(colorChecked);
    const [showTone, setShowTone] = useState<string>(soundTone);

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleVibrationCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.detail.checked);
        console.log('Vibration Checkbox value:', event.detail.checked);
        setVibration(event.detail.checked);
    };

    const handleSoundCheckboxChange = (event: { detail: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setSoundChecked(event.detail.checked);
        console.log('Sound checkbox value:', event.detail.checked);
        setSound(event.detail.checked);
    };

    const handleColorCheckboxChange = (event: CustomEvent) => {
        const value = event.detail.value as string;
        setShowColor(value === "danger" ? "Red" : value === "Dark" ? "Black" : value === "success" ? "Green" : value === "dark" ? "White" : "Favorite color")
        setColorChecked(value)
        console.log('color value:', value);
        setColor(value);
    };

    const handleToneCheckboxChange = (event: CustomEvent) => {
        const value = event.detail.value as string;
        setShowTone(value === "Tone1" ? "Tone 1" : value === "Tone2" ? "Tone 2" : value === "Tone3" ? "Tone 3" : "Favorite tone")
        setSoundTone(value)
        console.log('tone value:', value);
    };

    const handleSoundStrenghtCheckboxChange = (event: CustomEvent) => {
        const value = event.detail.value as number;
        setSoundStrength(value);
        console.log('Sound checkbox value:', value);
        setSoundStrenght(value);
    };

    const handleShare = () => {
        const shareData = {
            title: 'Check out this app!',
            text: 'I found this awesome app, and I think you will love it!',
            url: 'https://mytimer-ab4a6.web.app',
        };

        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        const smsURL = `sms:?body=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


        // Check if navigator.share is supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));

        } else if (navigator.share && isMobile) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else if (navigator.clipboard && isMobile) {
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    setShowToast(true);
                    console.log('Link copied to clipboard');
                })
                .catch((error) => console.log('Error copying to clipboard', error));
        } else {
            // Fallback options
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareData.url)
                    .then(() => {
                        setShowToast(true);
                        console.log('Link copied to clipboard');
                    })
                    .catch((error) => console.log('Error copying to clipboard', error));
            }

            const whatsappButton = document.createElement('button');
            whatsappButton.textContent = 'Share on WhatsApp';
            whatsappButton.onclick = () => window.open(whatsappURL, '_blank');

            const smsButton = document.createElement('button');
            smsButton.textContent = 'Share via SMS';
            smsButton.onclick = () => window.open(smsURL, '_blank');

            // Create a container for the buttons
            const shareContainer = document.createElement('div');
            shareContainer.appendChild(whatsappButton);
            shareContainer.appendChild(smsButton);

            // Assuming you have a modal or toast to show these buttons
            // Here is a simple example of appending buttons to the body
            document.body.appendChild(whatsappButton);
            document.body.appendChild(shareContainer);
            document.body.appendChild(smsButton);
        }
    };

    async function shareURL() {
        try {
          await Share.share({
            url: 'https://mytimer-ab4a6.web.app',
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      }

    useEffect(() => {
        //updation show color
    }, [showColor, handleColorCheckboxChange])
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Timer</IonTitle>
                    <IonButtons class='header-setting' slot="end">
                        <IonButton size='large' onClick={() => setShowModal(true)}>
                            <IonIcon icon={settingsOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Setting</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>
                                    <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
                                </IonButton>

                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">

                        <IonList>
                            <IonItem>
                                <IonSelect label="Color" placeholder={showColor}
                                    onIonChange={handleColorCheckboxChange}>
                                    <IonSelectOption value="danger">Red</IonSelectOption>
                                    <IonSelectOption value="Dark">Black</IonSelectOption>
                                    <IonSelectOption value="success">Green</IonSelectOption>
                                    <IonSelectOption value="dark">White</IonSelectOption>
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonCheckbox id='checkBox'
                                    checked={soundChecked}
                                    onIonChange={handleSoundCheckboxChange}
                                    style={{ marginLeft: 'auto' }}>Enable sound</IonCheckbox>
                            </IonItem>

                            <IonItem>
                                <IonSelect value={soundTone} onIonChange={handleToneCheckboxChange} label="Sound tone" labelPlacement="fixed" placeholder={showTone}>
                                    <IonSelectOption value="Tone1">Tone 1</IonSelectOption>
                                    <IonSelectOption value="Tone2">Tone 2</IonSelectOption>
                                    <IonSelectOption value="Tone3">Tone 3</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>

                        <IonRange value={soundStrenght} onIonChange={handleSoundStrenghtCheckboxChange}>
                            <div slot="label">
                                <IonText color="primary">Sound strength</IonText>
                            </div>
                        </IonRange>

                        <IonItem>
                            <IonCheckbox id='checkBox'
                                checked={checked}
                                onIonChange={handleVibrationCheckboxChange}
                                style={{ marginLeft: 'auto' }}>Enable vibration</IonCheckbox>
                        </IonItem>
                    </IonContent>

                    <IonFab vertical="bottom" horizontal="start" slot="fixed">
                        <IonFabButton onClick={shareURL}>
                            <IonIcon icon={shareOutline} />
                        </IonFabButton>
                    </IonFab>
                </IonModal>
                
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Link copied to clipboard"
                    duration={2000}
                />
            </IonContent>
        </IonPage>
    );
}

export default SettingModal;
