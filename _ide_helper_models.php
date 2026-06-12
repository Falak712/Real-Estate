<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RealEstate> $realestate
 * @property-read int|null $realestate_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Area whereUpdatedAt($value)
 */
	class Area extends \Eloquent {}
}

namespace App\Models{
/**
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Profile query()
 */
	class Profile extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $reason
 * @property int|null $length_of_punishment
 * @property int $number_of_times
 * @property int $is_permanent
 * @property string|null $start_date
 * @property string|null $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereIsPermanent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereLengthOfPunishment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereNumberOfTimes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Punishment whereUserId($value)
 */
	class Punishment extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property numeric $price
 * @property string|null $description
 * @property float $size
 * @property int|null $bedrooms
 * @property int|null $bathrooms
 * @property string $direction
 * @property string $address
 * @property float $point_of_length
 * @property float $point_of_width
 * @property string $type_real_estate
 * @property string $status_real_estate
 * @property string $contract_type
 * @property string|null $ownership_contract
 * @property string|null $agency_contract
 * @property string $order_status
 * @property string|null $publication_date
 * @property int $user_id
 * @property int $area_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Area $area
 * @property-read \App\Models\User|null $owner
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereAgencyContract($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereBathrooms($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereBedrooms($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereContractType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereDirection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereOrderStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereOwnershipContract($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate wherePointOfLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate wherePointOfWidth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate wherePublicationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereStatusRealEstate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereTypeRealEstate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RealEstate whereUserId($value)
 */
	class RealEstate extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $fullname
 * @property string $email
 * @property string $password
 * @property string $phone_number
 * @property int $banned
 * @property string $userType
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $personal_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Punishment> $punishments
 * @property-read int|null $punishments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RealEstate> $realEstate
 * @property-read int|null $real_estate_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBanned($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFullname($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePersonalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUserType($value)
 */
	class User extends \Eloquent {}
}

