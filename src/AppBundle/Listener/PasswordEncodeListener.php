<?php
namespace AppBundle\Listener;

use AppBundle\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncodeListener implements EventSubscriber
{
	protected $passwordEncoder;

	public function __construct(UserPasswordEncoderInterface $passwordEncoder)
	{
		$this->passwordEncoder = $passwordEncoder;
	}

	public function getSubscribedEvents()
	{
		return ['prePersist', 'preUpdate'];
	}

	public function prePersist(LifecycleEventArgs $args)
	{
		$entity = $args->getEntity();
		if (!$entity instanceof User) {
			return;
		}
		$this->encodePassword($entity);
	}

	public function preUpdate(LifecycleEventArgs $args)
	{
		$entity = $args->getEntity();
		if (!$entity instanceof User) {
			return;
		}
		$this->encodePassword($entity);
		$em = $args->getEntityManager();
        $meta = $em->getClassMetadata(get_class($entity));
        $em->getUnitOfWork()->recomputeSingleEntityChangeSet($meta, $entity);
	}

	protected function encodePassword($entity)
	{
		if (!$entity->getPlainPassword()) {
			return;
		}
		$encoded = $this->passwordEncoder->encodePassword(
			$entity,
			$entity->getPlainPassword()
        );
        $entity->setPassword($encoded);
	}
}